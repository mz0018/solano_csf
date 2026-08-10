import jwt from 'jsonwebtoken'
import UserService from '../services/UserService.js'
class UserController {

    verifyUser = async (req, res, next) => {
        try {
            const result = UserService.verifyUser(req.user)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    signupUser = async (req, res, next) => {
        try {
            const userData = req.body

            const result = await UserService.signupUser(userData)

            res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    signinUser = async (req, res, next) => {
        try {
            const credentials = req.body

            const token = await UserService.signinUser({ ...credentials, req })

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            res.cookie('authToken', token, {
                httpOnly: false, // Set to true in production with HTTPS
                secure: false,
                sameSite: 'Lax',
                maxAge: 15 * 60 * 1000,
                path: '/'
            })

            res.status(200).json({
                message: 'Login 200',
                // token,
                user: credentials.userName,
                role: decoded.role,
                officeCode: decoded.officeCode
            })
            
        } catch (error) {
            next(error)
        }
    }

    signoutUser = async (req, res, next) => {
        try {
            res.clearCookie('authToken', { path: '/' })
            res.status(200).json({ message: 'Logout successful' })
        } catch (error) {
            next(error)
        }
    }

    changePassword = async (req, res, next) => {
        try {
            const { currentPassword, newPassword } = req.body
            const userId = req.user.id 
            
            const result = await UserService.changePassword(userId, currentPassword, newPassword)
            
            res.clearCookie('authToken', { path: '/' })
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    getLoginHistory = async (req, res, next) => {
        try {
            const userId = req.user.id
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const result = await UserService.getLoginHistory(userId, page, limit)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

}

export default new UserController()