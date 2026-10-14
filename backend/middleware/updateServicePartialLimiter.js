const updateServiceAttempts = new Map()
const MAX_ATTEMPTS = 3
const WINDOW_MS = 15 * 60 * 1000

export const updateServicePartialLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket.remoteAddress
    const now = Date.now()
    const record = updateServiceAttempts.get(ip)

    if (!record) {
        updateServiceAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (now > record.resetTime) {
        updateServiceAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }

    if (record.count >= MAX_ATTEMPTS) {
        const remainingTime = Math.ceil((record.resetTime - now) / 1000)
        return res.status(429).json({
            message: `Too many service update attempts. Try again in ${remainingTime} seconds.`
        })
    }

    record.count++
    updateServiceAttempts.set(ip, record)
    next()
}