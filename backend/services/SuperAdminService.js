import User from '../models/user.model.js'
import Notification from '../models/notification.model.js'
import argon2 from 'argon2'
import ErrorController from '../controllers/ErrorController.js'
import mongoose from 'mongoose'
import Queue from '../models/queue.model.js'

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
            role: {
                $ne: 'super_admin',
            },
        })
            .select('_id firstName lastName userName officeCode status role')
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

    async updateClientStatus(clientId) {    
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            throw new ErrorController('Invalid user ID', 404)
        }

        const client = await User.findById(clientId)
            .select('_id status')

        if (!client) {
            throw new ErrorController('Client not found', 404)
        }

        client.status = client.status === 'active'
            ? 'inactive'
            : 'active'

        await client.save()

        return {
            _id: client._id,
            status: client.status
        }
    }

    async getTicketTrackerByDate(officeCode, dateFrom, page = 1, limit = 10) {
        const startOfDay = new Date(dateFrom);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(dateFrom);
        endOfDay.setHours(23, 59, 59, 999);

        const filter = {
            officeCode,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        };

        const skip = (page - 1) * limit;

        const tickets = await Queue.find(filter)
            .select('_id code status createdAt generatedBy')
            .populate('generatedBy', '_id firstName lastName userName')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Queue.countDocuments(filter);

        return {
            tickets,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            officeCode,
            date: startOfDay.toISOString()
        };
    }


}

export default new UserService()