import jwt from 'jsonwebtoken'
const requestLogger = (req, res, next) => {
    const token = req.cookies.authToken
    if (!token) return next()
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} | User: ${decoded.id}`)
    } catch {
        // invalid/expired token — skip logging
    }
    next()
}
export default requestLogger