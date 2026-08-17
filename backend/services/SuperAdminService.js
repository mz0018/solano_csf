import User from '../models/user.model.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
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

        return true
    }

    async searchClient(clientName) {

        const client = await User.find({
            firstName: {
                $regex: clientName,
                $options: 'i',
            },
        })
            .select('_id firstName')
            .limit(10)
            .lean()

        return client
    }

}

export default new UserService()