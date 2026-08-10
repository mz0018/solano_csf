const attempts = new Map()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

export const signinRateLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket.remoteAddress
    const now = Date.now()
    const record = attempts.get(ip)

    if (!record) {
        attempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (now > record.resetTime) {
        attempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (record.count >= MAX_ATTEMPTS) {
        const remainingTime = Math.ceil((record.resetTime - now) / 1000)
        return res.status(429).json({
            message: `Too many login attempts. Try again in ${remainingTime} seconds.`
        })
    }

    record.count++
    attempts.set(ip, record)

    next()
}