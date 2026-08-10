import jwt from 'jsonwebtoken'
import ErrorController from '../controllers/ErrorController.js'
export const authorizeViaCookie = (req, res, next) => {
    const token = req.cookies.authToken
    if (!token) {
        return next(new ErrorController('Unauthorized', 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded.id) {
            return next(new ErrorController('User Id not found in token', 401))
        }
        const newToken = jwt.sign(
            { id: decoded.id, firstName: decoded.firstName, lastName: decoded.lastName, userName: decoded.userName, role: decoded.role, officeCode: decoded.officeCode },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        )
        res.cookie('authToken', newToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000,
            path: '/'
        })
        req.user = decoded
        req.user_id = decoded.id
        next()
    } catch (error) {
        return next(new ErrorController('Invalid or expired token', 401))
    }
}
export const verifyToken = (token) => {
    if (!token) throw new ErrorController('Unauthorized', 401)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded.id) throw new ErrorController('User Id not found in token', 401)
    return decoded
}