const signupAttempts = new Map()
const MAX_SIGNUP_ATTEMPTS = 15
const WINDOW_MS = 15 * 60 * 1000

export const signupRateLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket.remoteAddress
    const now = Date.now()
    const record = signupAttempts.get(ip)

    if (!record) {
        signupAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (now > record.resetTime) {
        signupAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (record.count >= MAX_SIGNUP_ATTEMPTS) {
        const remainingTime = Math.ceil((record.resetTime - now) / 1000)
        return res.status(429).json({
            message: `Too many signup attempts. Try again in ${remainingTime} seconds.`
        })
    }

    record.count++
    signupAttempts.set(ip, record)

    next()
}