import User from '../models/user.model.js'
import Office from '../models/office.model.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import ErrorController from '../controllers/ErrorController.js'

class UserService {
    
    verifyUser(user) {
        return { user }
    }

    async signupUser(userData) {
        
        const existingUser = await User.findOne({ userName: userData.userName })

        if (existingUser) {
            throw new ErrorController('Username already taken', 409)
        }

        // Validate that the office code exists
        const office = await Office.findOne({ code: userData.officeCode })
        if (!office) {
            throw new ErrorController('Invalid office code', 400)
        }

        // Validate that the role is one of the allowed roles
        const validRoles = ['office_admin', 'hr_admin', 'super_admin']
        if (!validRoles.includes(userData.role)) {
            throw new ErrorController('Invalid role', 400)
        }

        console.log(userData)

        const hashedPassword = await argon2.hash(userData.password)

        const newUser = await User.create({
            ...userData,
            password: hashedPassword,
        })

        return {
            id: newUser._id,
            userName: newUser.userName,
        }
        
    }

    async signinUser(credentials) {
        const { userName, password } = credentials

        const user = await User.findOne({ userName })

        if (!user) {
            throw new ErrorController('Invalid username or password', 401)
        }

        const isPasswordValid = await argon2.verify(user.password, password)

        if (!isPasswordValid) {
            await this.recordLogin(user, credentials.req, false)
            throw new ErrorController('Invalid username or password', 401)
        }

        await this.recordLogin(user, credentials.req, true)

        const token = jwt.sign(
            { id: user._id, firstName: user.firstName, lastName: user.lastName, userName: user.userName, role: user.role, officeCode: user.officeCode },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        )

        return token
    }

    async recordLogin(user, req, success) {
        const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
        const userAgent = req.headers['user-agent'] || 'unknown'
        
        user.loginHistory.push({
            ip,
            userAgent,
            loginAt: new Date(),
            success
        })
        
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        user.loginHistory = user.loginHistory.filter(h => h.loginAt > thirtyDaysAgo)
        
        await user.save()
    }

    async changePassword(userId, currentPassword, newPassword) {
        const user = await User.findById(userId)
        if (!user) throw new ErrorController('User not found', 404)

        const lastChanged = user.passwordChangedAt || user.createdAt
        const daysSinceChange = (Date.now() - lastChanged.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceChange < 60) {
            const remaining = Math.ceil(60 - daysSinceChange)
            throw new ErrorController(`Password can only be changed once every 60 days. Try again in ${remaining} day${remaining > 1 ? 's' : ''}.`, 400)
        }

        const isValid = await argon2.verify(user.password, currentPassword)
        if (!isValid) throw new ErrorController('Current password is incorrect', 401)

        const hashedPassword = await argon2.hash(newPassword)
        user.password = hashedPassword
        user.passwordChangedAt = new Date()
        
        user.loginHistory = []
        
        await user.save()
        return { message: 'Password changed successfully. Please log in again.' }
    }

    async getLoginHistory(userId, page = 1, limit = 10) {
        const user = await User.findById(userId).select('loginHistory')
        if (!user) throw new ErrorController('User not found', 404)
        
        const sorted = user.loginHistory
            .sort((a, b) => b.loginAt - a.loginAt)
            .map(h => ({ ip: h.ip, userAgent: h.userAgent, loginAt: h.loginAt, success: h.success }))
        
        const total = sorted.length
        const totalPages = Math.ceil(total / limit)
        const start = (page - 1) * limit
        const history = sorted.slice(start, start + limit)
        
        return { history, total, totalPages, page }
    }

}

export default new UserService()