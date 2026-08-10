const verifyAttempts = new Map()
const MAX_VERIFY_ATTEMPTS = 15
const WINDOW_MS = 15 * 60 * 1000

export const verifyQueueRateLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket.remoteAddress
    const now = Date.now()
    const record = verifyAttempts.get(ip)

    if (!record) {
        verifyAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }
    if (now > record.resetTime) {
        verifyAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }
    if (record.count >= MAX_VERIFY_ATTEMPTS) {
        return res.status(429).json({
            message: `Too many verify attempts. Please try again later.`
        })
    }
    record.count++
    verifyAttempts.set(ip, record)
    next()
}