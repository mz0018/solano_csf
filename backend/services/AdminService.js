import Queue from '../models/queue.model.js'
import User from '../models/user.model.js'
import Office from '../models/office.model.js'
import Service from '../models/service.model.js'
import ChildServices from '../models/services.child.model.js'
import Feedback from '../models/feedback.model.js'
import ErrorController from '../controllers/ErrorController.js'
import mongoose from 'mongoose'

import { customAlphabet } from 'nanoid'

const generateCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789',6)

const calculateRatingAverage = (ratings = {}) => {
    const values = Object.values(ratings);

    if (values.length === 0) return 0;

    const total = values.reduce((sum, value) => sum + value, 0);

    return Number((total / values.length).toFixed(2));
};

class AdminService {

    async generateTicket(userId, selectedService, otherServiceDetail, selectedChildServices) {
        console.log(selectedService)
        console.log(selectedChildServices)

        if (!selectedService || (Array.isArray(selectedService) && selectedService.length === 0)) {
            throw new ErrorController('No service found', 400)
        }

        if (selectedService.includes('APPLICATION_FOR_LEAVE') && !selectedChildServices) {
            throw new ErrorController('No selected type of leave found', 400)
        }

        const user = await User.findById(userId)
        if (!user) throw new ErrorController('User not found', 401)

        const officeCode = user.officeCode

        if (!officeCode) {
            throw new ErrorController('No office assigned', 400)
        }

        const services = Array.isArray(selectedService)
            ? selectedService
            : [selectedService]

        if (services.length === 0) {
            throw new ErrorController('No service found', 400)
        }

        const hasOther = services.includes('OTHER_SERVICE')
        if (hasOther && !otherServiceDetail?.trim()) {
            throw new ErrorController('Other service detail is required', 400)
        }
        const normalizedOtherDetail = hasOther ? otherServiceDetail.trim().slice(0, 200) : null

        const ticket = await Queue.create({
            selectedService: services,
            selectedChildService: selectedChildServices,
            otherServiceDetail: normalizedOtherDetail,
            officeCode: `${officeCode}`,
            code: generateCode(),
            generatedBy: userId
        })

        if (global.io) {
            global.io
                .to(`office:${officeCode}`)
                .emit('ticket:created', {
                    tickets: [ticket],
                    officeCode
                })
        }

        return [ticket]
    }

    async getActiveQueueByDateService(
        dateToday,
        user,
        page = 1,
        limit = 10,
        status = ""
    ) {
        const userOfficeCode = user?.officeCode;

        const startOfDay = new Date(dateToday);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(dateToday);
        endOfDay.setHours(23, 59, 59, 999);

        const filter = {
            officeCode: userOfficeCode,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        };

        // Apply status filter only when a status is selected
        if (status) {
            filter.status = status;
        }

        const [queue, total, statusCounts] = await Promise.all([
            Queue.find(filter)
                .select('_id code status otherServiceDetail selectedService')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),

            Queue.countDocuments(filter),

            Queue.aggregate([
                {
                    $match: {
                        officeCode: userOfficeCode,
                        createdAt: {
                            $gte: startOfDay,
                            $lte: endOfDay
                        }
                    }
                },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ])
        ]);

        const statusCountsResult = {
            pending: 0,
            used: 0,
            expired: 0
        };

        statusCounts.forEach(item => {
            if (Object.prototype.hasOwnProperty.call(statusCountsResult, item._id)) {
                statusCountsResult[item._id] = item.count;
            }
        });

        return {
            queue,
            total,
            status: statusCountsResult,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            date: startOfDay.toISOString()
        };
    }

    async getDetailedFeedbackByCode(code) {
        const queue = await Queue.findOne({ code }).select('code officeCode otherServiceDetail')

        if (!queue) throw new ErrorController('Queue ticket not found', 404)
        const feedback = await Feedback.findOne({
            queueNumber: code
        })
        .select('client.name client.gender client.employmentStatus client.address service otherServiceDetail comments ratings')

        if (!feedback) throw new ErrorController('Feedback not found', 404)

        const rawService = feedback.service
        const codes = Array.isArray(rawService) ? rawService : rawService ? [rawService] : []
        let serviceName = codes.join(", ")

        if (codes.length > 0 && queue.officeCode) {
            const serviceDocs = await Service.find({
                officeCode: queue.officeCode,
                code: { $in: codes }
            }).select('name code')

            const nameMap = Object.fromEntries(serviceDocs.map(s => [s.code, s.name]))
            // Prefer feedback's otherServiceDetail, fallback to queue's for legacy feedbacks
            const otherDetail = feedback.otherServiceDetail || queue.otherServiceDetail
            if (otherDetail) {
                nameMap['OTHER_SERVICE'] = `Other Service: ${otherDetail}`
            }
            const names = codes.map(c => nameMap[c] || c)
            serviceName = names.join(", ")
        }

        return { 
            queue: { code: queue.code, otherServiceDetail: queue.otherServiceDetail },
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
        const [feedbacks, serviceDocs, queueServiceCounts] = await Promise.all([
            Feedback.find({
                officeCode,
                createdAt: { $gte: startDate, $lte: endDate }
            })
            .lean()
            .select('service otherServiceDetail client.gender client.affiliation client.ageGroup client.employmentStatus client.address ratings comments createdAt'),
            Service.find({ officeCode })
                .select('code name type')
                .lean(),
            Queue.aggregate([                      
                {
                    $match: { officeCode, createdAt: { $gte: startDate, $lte: endDate } }
                },
                { $unwind: '$selectedService' },
                { $group: { _id: '$selectedService', count: { $sum: 1 } } }
            ])
        ]);

        const serviceNameMap = Object.fromEntries(
            serviceDocs.map(s => [s.code, s.name])
        );
        const serviceTypeMap = Object.fromEntries(
            serviceDocs.map(s => [s.code, s.type])
        );

        const serviceTransactions = queueServiceCounts
        .map(({ _id, count }) => ({
            service: _id === 'OTHER_SERVICE' ? 'Other Service' : serviceNameMap[_id] || _id,
            totalTransactions: count,
        }))
        .sort((a, b) => b.totalTransactions - a.totalTransactions);
        
        const feedbacksWithNames = feedbacks.map(f => {
            const codes = Array.isArray(f.service) ? f.service : f.service ? [f.service] : []
            const names = codes.map(code => {
                if (code === 'OTHER_SERVICE' && f.otherServiceDetail) {
                    return `Other Service: ${f.otherServiceDetail}`
                }
                return serviceNameMap[code] || code
            })
            return { ...f, service: names }
        });

        const services = feedbacks.flatMap(item => {
            const codes = Array.isArray(item.service)
                ? item.service
                : item.service ? [item.service] : [];

            return codes.map(code => ({
                service: code === 'OTHER_SERVICE' && item.otherServiceDetail
                    ? `Other Service: ${item.otherServiceDetail}`
                    : serviceNameMap[code] || code,
                type: serviceTypeMap[code] || 'unknown'
            }));
        });

        console.log(services)

        return {
            office,
            dateFrom,
            dateTo,
            serviceTransactions,
            totalFeedbacks: feedbacks.length,
            feedbacks: feedbacksWithNames,
            services,
        };
    }

    async getOfficeService(userOfficeCode) {
        if (!userOfficeCode) {
            throw new ErrorController('Office code is required', 400)
        }
        
        const services = await Service.find({ officeCode: userOfficeCode })
            .select('code name status type')
            .lean()
        
        return services
    }

    async getChildServices(userOfficeCode) {
        if (!userOfficeCode) {
            throw new ErrorController('Office code is required', 400)
        }

        const childServices = await ChildServices.find({ officeCode: userOfficeCode })
            .select('code name status type')
            .lean()

        return childServices
    }

    async getRenderedService(userOfficeCode, dateFrom, dateTo, page = 1, limit = 10) {
        if (!userOfficeCode) throw ErrorController('Office code is required', 400)
        if (!dateFrom || !dateTo) throw ErrorController('Date range is required', 400)

        const startDate = new Date(dateFrom)
        const endDate = new Date(dateTo)
        endDate.setDate(endDate.getDate() + 1)

        const filter = {
            officeCode: userOfficeCode,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        }

        const [queue, total, serviceCountResult, allOfficeServices] = await Promise.all([
            Queue.find(filter)
                .select('selectedService generatedBy createdAt')
                .lean()
                .skip((page - 1) * limit)
                .limit(limit),

            Queue.countDocuments(filter),

            Queue.aggregate([
                { $match: filter },
                { $unwind: '$selectedService' },
                {
                    $group: {
                        _id: '$selectedService',
                        count: { $sum: 1 }
                    }
                }
            ]),

            Service.find({ officeCode: userOfficeCode }).select('code').lean()
        ])

        // Initialize ALL office services with 0
        const serviceCounts = {}
        allOfficeServices.forEach(s => { serviceCounts[s.code] = 0 })

        // Override with actual counts from rendered services
        serviceCountResult.forEach(item => {
            serviceCounts[item._id] = item.count
        })

        // Get unique generatedBy IDs
        const generatedByIds = [
            ...new Set(
                queue
                    .filter(q => q.generatedBy)
                    .map(q => q.generatedBy.toString())
            )
        ]

        // Get users
        const users = await User.find({
            _id: { $in: generatedByIds }
        })
            .select('firstName lastName')
            .lean()

        // Create user lookup
        const userMap = new Map(
            users.map(user => [
                user._id.toString(),
                {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            ])
        )

        // Attach user information to each ticket
        const data = queue.map(q => ({
            ...q,
            generatedByUser: q.generatedBy
                ? userMap.get(q.generatedBy.toString()) || null
                : null
        }))

        return {
            data,
            serviceCounts,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }

    async saveNewService(data, user) {

        if (!data) throw new ErrorController('New service data not found', 401)
        if (!user) throw new ErrorController('User not found', 401)

        const serviceName = data.serviceName.charAt(0).toUpperCase() + data.serviceName.slice(1).toLowerCase();
        const serviceCode = serviceName.toUpperCase().replace(/\s+/g, '_')
        const serviceOfficeCode = user.officeCode
        const userName = `${user.firstName}, ${user.lastName}`
        const userId = user.id
        const serviceType = data.serviceType
        const serviceStatus = 'active'

        const newService = await Service({
            officeCode: serviceOfficeCode,
            code: serviceCode,
            name: serviceName,
            status: serviceStatus,
            type: serviceType,
            createdBy: {
                user: userName,
                userId: userId,
            }
        })

        await newService.save()
        return newService
    }

    async updateServiceStatus(serviceId, status, user) {
        if (!user?.officeCode) throw new ErrorController('Office code is required', 400)

        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            throw new ErrorController('Invalid service ID', 400)
        }

        if (!['active', 'inactive'].includes(status)) {
            throw new ErrorController('Invalid service status', 400)
        }

        const service = await Service.findOneAndUpdate(
            { _id: serviceId, officeCode: user.officeCode },
            { status },
            { returnDocument: 'after', runValidators: true }
        ).select('code name status type').lean()

        if (!service) throw new ErrorController('Service not found', 404)

        return service
    }

    async partialUpdateService(serviceId, changes, user) {
        if (!user?.officeCode) {
            throw new ErrorController('Office code is required', 400)
        }

        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            throw new ErrorController('Invalid service ID', 400)
        }

        if (!changes || typeof changes !== 'object' || Array.isArray(changes)) {
            throw new ErrorController('Service changes are required', 400)
        }

        const allowedFields = ['name', 'type']
        const changedFields = Object.keys(changes)

        if (
            changedFields.length === 0 ||
            changedFields.some(field => !allowedFields.includes(field))
        ) {
            throw new ErrorController('Invalid service changes', 400)
        }

        const updates = {}

        if (Object.hasOwn(changes, 'name')) {
            if (typeof changes.name !== 'string' || !changes.name.trim()) {
                throw new ErrorController('Service name is required', 400)
            }

            updates.name = changes.name.trim()
        }

        if (Object.hasOwn(changes, 'type')) {
            if (!['external', 'internal'].includes(changes.type)) {
                throw new ErrorController('Invalid service type', 400)
            }

            updates.type = changes.type
        }

        const service = await Service.findOneAndUpdate(
            {
                _id: serviceId,
                officeCode: user.officeCode
            },
            {
                $set: updates
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        )
            .select('code name status type')
            .lean()

        if (!service) {
            throw new ErrorController('Service not found', 404)
        }

        return service
    }

}

export default new AdminService