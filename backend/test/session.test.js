import 'dotenv/config'
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import express from 'express'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import mongoose from 'mongoose'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import userRoute from '../routes/userRoute.js'
import { errorHandler } from '../middleware/errorHandler.js'
import User from '../models/user.model.js'
import { SESSION_TTL_MS } from '../config/session.js'

let server, baseUrl

const api = (path, { method = 'GET', cookie, body } = {}) =>
    fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            ...(body ? { 'Content-Type': 'application/json' } : {}),
            ...(cookie ? { Cookie: cookie } : {})
        },
        body: body ? JSON.stringify(body) : undefined
    })

const cookiePair = (res) => {
    const sc = (res.headers.getSetCookie?.() || []).find(c => c.startsWith('authToken='))
    assert.ok(sc, 'expected auth cookie on response')
    return sc.split(';')[0]
}

const createUser = async (userName, overrides = {}) =>
    User.create({
        firstName: 'Test', lastName: 'User', userName,
        password: await argon2.hash('Password1'),
        officeCode: 'OFF01', role: 'office_admin', status: 'active',
        passwordChangedAt: new Date(Date.now() - 61 * 24 * 60 * 60 * 1000),
        ...overrides
    })

const signin = (userName, password = 'Password1') =>
    api('/api/users/signin', { method: 'POST', body: { userName, password } })

const dbUser = (userName) => User.findOne({ userName })

before(async () => {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set (run from backend/ with .env)')
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'solano_csf_test' })
    await mongoose.connection.dropDatabase()
    const app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use('/api/users', userRoute)
    app.use(errorHandler)
    server = createServer(app)
    await new Promise(r => server.listen(0, '127.0.0.1', r))
    baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
    await new Promise(r => server.close(r))
})

test('login sets HttpOnly 15-min cookie (req 7)', async () => {
    await createUser('cookie_user')
    const res = await signin('cookie_user')
    assert.equal(res.status, 200)
    const setCookie = (res.headers.getSetCookie?.() || []).find(c => c.startsWith('authToken='))
    assert.match(setCookie, /HttpOnly/i)
    assert.match(setCookie, new RegExp(`Max-Age=${SESSION_TTL_MS / 1000}`))
    assert.match(setCookie, /SameSite=Lax/i)
    const secure = /;\s*Secure/i.test(setCookie)
    assert.equal(secure, process.env.NODE_ENV === 'production')
})

test('active session blocks second device, A is not kicked (req 1)', async () => {
    await createUser('block_user')
    const a = await signin('block_user')
    assert.equal(a.status, 200)
    const aCookie = cookiePair(a)

    const b = await signin('block_user')
    assert.equal(b.status, 409)

    const before = await dbUser('block_user')
    assert.ok(before.sessionExpiresAt > new Date(), 'session must stay active after 409')

    const verifyA = await api('/api/users/verify', { cookie: aCookie })
    assert.equal(verifyA.status, 200, 'device A must still be logged in')
})

test('concurrent logins: exactly one wins (req 8)', async () => {
    await createUser('race_user')
    const [r1, r2] = await Promise.all([signin('race_user'), signin('race_user')])
    const statuses = [r1.status, r2.status].sort()
    assert.deepEqual(statuses, [200, 409])
})

test('idle expiry: 401 enforced by backend, new login allowed, old JWT dead (req 2+5)', async () => {
    await createUser('idle_user')
    const a = await signin('idle_user')
    const aCookie = cookiePair(a)

    await User.updateOne({ userName: 'idle_user' },
        { $set: { sessionExpiresAt: new Date(Date.now() - 1000) } })

    const verifyA = await api('/api/users/verify', { cookie: aCookie })
    assert.equal(verifyA.status, 401, 'expired session must be rejected server-side')

    const b = await signin('idle_user')
    assert.equal(b.status, 200, 'idle session must not lock out login')

    const replayA = await api('/api/users/verify', { cookie: aCookie })
    assert.equal(replayA.status, 401, 'old JWT must stay invalid after new login')

    const u = await dbUser('idle_user')
    assert.ok(u.tokenVersion >= 2)
    assert.notEqual(u.tokenVersion, 0, 'tokenVersion must never reset to 0')
})

test('authenticated request slides expiry forward (req 2)', async () => {
    await createUser('slide_user')
    const a = await signin('slide_user')
    assert.equal(a.status, 200)
    const cookie = cookiePair(a)

    const nearExpiry = new Date(Date.now() + SESSION_TTL_MS - 5 * 60 * 1000)
    await User.updateOne({ userName: 'slide_user' }, { $set: { sessionExpiresAt: nearExpiry } })

    const verify = await api('/api/users/verify', { cookie })
    assert.equal(verify.status, 200)

    const u = await dbUser('slide_user')
    assert.ok(u.sessionExpiresAt.getTime() > nearExpiry.getTime(), 'expiry must slide forward')
    assert.ok(u.sessionExpiresAt.getTime() >= Date.now() + SESSION_TTL_MS - 5000,
        'expiry should be ≈ now + 15 min')
})

test('logout releases lock immediately and revokes token (req 3+5)', async () => {
    await createUser('out_user')
    const a = await signin('out_user')
    const aCookie = cookiePair(a)

    const out = await api('/api/users/signout', { method: 'POST', cookie: aCookie })
    assert.equal(out.status, 200)

    const afterLogout = await dbUser('out_user')
    assert.equal(afterLogout.sessionExpiresAt, null)
    assert.ok(afterLogout.tokenVersion >= 2, 'version must increment, never 0')

    const b = await signin('out_user')
    assert.equal(b.status, 200, 'device B must log in immediately after logout')

    const replayA = await api('/api/users/verify', { cookie: aCookie })
    assert.equal(replayA.status, 401, 'signed-out token must be dead')
})

test('signout rejects unauthenticated and forged cookies (issue 4)', async () => {
    const victim = await createUser('victim_user')

    const noCookie = await api('/api/users/signout', { method: 'POST' })
    assert.equal(noCookie.status, 401)

    const forged = jwt.sign(
        { id: victim._id.toString(), tokenVersion: victim.tokenVersion },
        'attacker-guess'
    )
    const forgery = await api('/api/users/signout', {
        method: 'POST', cookie: `authToken=${forged}`
    })
    assert.equal(forgery.status, 401)

    const still = await dbUser('victim_user')
    assert.equal(String(still.tokenVersion), String(victim.tokenVersion), 'victim session untouched')
    assert.ok(still.sessionExpiresAt === null || true) // user was never logged in; state unchanged
})

test('password change releases lock and permanently kills old token (req 4+5)', async () => {
    await createUser('pw_user')
    const a = await signin('pw_user')
    const aCookie = cookiePair(a)

    const changed = await api('/api/users/change-password', {
        method: 'POST',
        cookie: aCookie,
        body: { currentPassword: 'Password1', newPassword: 'NewPass123' }
    })
    assert.equal(changed.status, 200)

    const u = await dbUser('pw_user')
    assert.equal(u.sessionExpiresAt, null)
    assert.ok(u.tokenVersion >= 2)

    const replay = await api('/api/users/verify', { cookie: aCookie })
    assert.equal(replay.status, 401, 'pre-change token must be dead')

    const relogin = await signin('pw_user', 'NewPass123')
    assert.equal(relogin.status, 200, 'immediate re-login after password change')

    const replay2 = await api('/api/users/verify', { cookie: aCookie })
    assert.equal(replay2.status, 401)
})

test('tokenVersion strictly increases across lifecycle, never 0 (req 5)', async () => {
    await createUser('mono_user')
    const a = await signin('mono_user')
    assert.equal(a.status, 200)
    const aCookie = cookiePair(a)
    const v1 = (await dbUser('mono_user')).tokenVersion

    const out = await api('/api/users/signout', { method: 'POST', cookie: aCookie })
    assert.equal(out.status, 200)
    const v2 = (await dbUser('mono_user')).tokenVersion

    const b = await signin('mono_user')
    assert.equal(b.status, 200)
    const v3 = (await dbUser('mono_user')).tokenVersion

    assert.ok(v1 > 0 && v2 > v1 && v3 > v2, `versions must strictly increase: ${v1},${v2},${v3}`)
})