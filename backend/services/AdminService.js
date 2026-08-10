import Queue from '../models/queue.model.js'
import User from '../models/user.model.js'
import Office from '../models/office.model.js'
import Service from '../models/service.model.js'
import Feedback from '../models/feedback.model.js'
import ErrorController from '../controllers/ErrorController.js'

import { customAlphabet } from 'nanoid'

const generateCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789',6)

const calculateRatingAverage = (ratings = {}) => {
    const values = Object.values(ratings);

    if (values.length === 0) return 0;

    const total = values.reduce((sum, value) => sum + value, 0);

    return Number((total / values.length).toFixed(2));
};

class AdminService {

    async generateTicket(userId, count) {
        if (count < 1 || count > 100) throw new ErrorController('Ticket count must be between 1 and 100', 400) 

        const user = await User.findById(userId)

        if (!user) throw new ErrorController('User not found', 401)

        const officeCode = user.officeCode
        
        if (!officeCode) throw new ErrorController('No office assigned', 400)

        const year = String(new Date().getFullYear()).slice(-2)
        const tickets = []

        for (let i = 0; i < count; i++) {
            const ticket = await Queue.create({
                officeCode: `${officeCode}`,
                code: `${officeCode}${year}-${generateCode()}`
            })
            tickets.push(ticket)
        }

        if (global.io) {
            global.io.to(`office:${officeCode}`).emit('ticket:created', { tickets, officeCode })
        }

        return tickets         
    }

    async getActiveQueueByDateService(dateToday, user, page = 1, limit = 10) {
        const userOfficeCode = user?.officeCode;

        const startOfDay = new Date(dateToday);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(dateToday);
        endOfDay.setHours(23, 59, 59, 999);

        const filter = {
            officeCode: userOfficeCode,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        }

        const [queue, total] = await Promise.all([
            Queue.find(filter)
                .select('_id code status')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Queue.countDocuments(filter)
        ])

        return { queue, total, page, limit, totalPages: Math.ceil(total / limit), date: startOfDay.toISOString() }
    }

    async getDetailedFeedbackByCode(code) {
        const queue = await Queue.findOne({ code }).select('code officeCode')

        if (!queue) throw new ErrorController('Queue ticket not found', 404)
        const feedback = await Feedback.findOne({
            queueNumber: code
        })
        .select('client.name client.gender client.employmentStatus client.address service comments ratings')

        let serviceName = feedback?.service || null

        if (feedback?.service && queue.officeCode) {
            const serviceDoc = await Service.findOne({
                officeCode: queue.officeCode,
                code: feedback.service
            }).select('name')

            serviceName = serviceDoc?.name || feedback.service
        }

        return { 
            queue: { code: queue.code },
            feedback : {
                ...feedback.toObject(),
                service: serviceName
            }
        }
    }

    async getOffices() {
        const offices = await Office.find()
            .select("code name")
            .sort({ name: 1 })
            .lean();

        return offices
    }

    async getOfficeFeedbacksByDate(officeCode, month, year, page = 1, limit = 10) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);
        
        const filter = {
            officeCode: officeCode,
            createdAt: { $gte: startDate, $lte: endDate }
        };
        
        const [feedbacks, total] = await Promise.all([
            Feedback.find(filter)
                .select('queueNumber ratings createdAt')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Feedback.countDocuments(filter)
        ]);

        const feedbacksWithAverage = feedbacks.map((feedback) => ({
            ...feedback.toObject(),
            averageRating: calculateRatingAverage(feedback.ratings)
        }));
        
        return {
            officeCode,
            month,
            year,
            feedbacks: feedbacksWithAverage,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async getReportStatisticsByDate(officeCode, dateFrom, dateTo) {
        const office = await Office.findOne({ code: officeCode }).select('name')

        const startDate = new Date(dateFrom);
        const endDate = new Date(dateTo + 'T23:59:59.999');
        const [feedbacks, serviceDocs] = await Promise.all([
            Feedback.find({
                officeCode,
                createdAt: { $gte: startDate, $lte: endDate }
            })
            .lean()
            .select('service client.gender client.affiliation client.ageGroup client.employmentStatus client.address ratings comments createdAt'),
            Service.find({ officeCode })
                .select('code name')
                .lean()
        ]);
        const serviceNameMap = Object.fromEntries(
            serviceDocs.map(s => [s.code, s.name])
        );
        const feedbacksWithNames = feedbacks.map(f => ({
            ...f,
            service: serviceNameMap[f.service] || f.service,
        }));

        return {
            office,
            dateFrom,
            dateTo,
            totalFeedbacks: feedbacksWithNames.length,
            feedbacks: feedbacksWithNames,
        };
    }

}

export default new AdminService