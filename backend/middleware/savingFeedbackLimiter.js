const feedbackAttempts = new Map()
const MAX_ATTEMPTS = 1
const WINDOW_MS = 15 * 60 * 1000

setInterval(() => {
    const now = Date.now()
    for (const [key, rec] of feedbackAttempts) {
        if (now > rec.resetTime) feedbackAttempts.delete(key)
    }
}, WINDOW_MS)

export const savingFeedbackLimiter = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket.remoteAddress
    const queueNumber = req.body.queueNumber
    if (!queueNumber) return res.status(400).json({ message: 'Queue number required.' })

    const key = `${ip}:${queueNumber}`
    const now = Date.now()
    const record = feedbackAttempts.get(key)

    if (!record || now > record.resetTime) {
        feedbackAttempts.set(key, { count: 1, resetTime: now + WINDOW_MS })
        return next()
    }
    if (record.count >= MAX_ATTEMPTS) {
        return res.status(429).json({ message: 'Too many feedback submissions. Please try again later.' })
    }
    record.count++
    feedbackAttempts.set(key, record)
    next()
}