import User from '../models/user.model.js'
import Notification from '../models/notification.model.js'
import argon2 from 'argon2'
import ErrorController from '../controllers/ErrorController.js'
import mongoose from 'mongoose'

class UserService {

    async resetClientPassword(clientId) {
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            throw new ErrorController('Invalid user ID', 404)
        }

        const client = await User.findById(clientId).select('_id')

        if (!client) {
            throw new ErrorController('User not found', 404)
        }

        const defaultPassword = '12345678'
        const hashedPassword = await argon2.hash(defaultPassword)

        client.password = hashedPassword
        await client.save()

        await Notification.create({
            clientId: client._id,
            type: 'PASSWORD_RESET',
            content: 'Your password has been reset by an administrator',
        })

        if (global.io) {
            global.io.to(`user:${clientId}`).emit('password:reset', { 
                message: 'Your password has been reset by an administrator' 
            })
        }

        console.log(clientId)

        return true
    }

    async searchClient(clientName) {

        const client = await User.find({
            firstName: {
                $regex: clientName,
                $options: 'i',
            },
        })
            .select('_id firstName lastName')
            .limit(10)
            .lean()

        return client
    }

    async getClient(clientId) {
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            throw new ErrorController('Invalid user ID', 404)
        }

        const client = await User.findById(clientId)
            .select('_id firstName lastName userName officeCode role createdAt')
            .lean()

        if (!client) {
            throw new ErrorController('User not found', 404)
        }

        return client
    }

}

export default new UserService()