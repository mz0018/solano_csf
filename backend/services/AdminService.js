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

    async generateTicket(userId, selectedService, otherServiceDetail) {
        if (!selectedService) {
            throw new ErrorController('No service found', 400)
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

        // const year = String(new Date().getFullYear()).slice(-2)

        const ticket = await Queue.create({
            selectedService: services,
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
        const [feedbacks, serviceDocs] = await Promise.all([
            Feedback.find({
                officeCode,
                createdAt: { $gte: startDate, $lte: endDate }
            })
            .lean()
            .select('service otherServiceDetail client.gender client.affiliation client.ageGroup client.employmentStatus client.address ratings comments createdAt'),
            Service.find({ officeCode })
                .select('code name')
                .lean()
        ]);
        const serviceNameMap = Object.fromEntries(
            serviceDocs.map(s => [s.code, s.name])
        );
        // Keep one object per feedback (per person) – service stays as array of names
        // so Gender/Age/Affiliation/Quality counts stay 1 per person, while
        // service-specific docx sections expand internally per service
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

        return {
            office,
            dateFrom,
            dateTo,
            totalFeedbacks: feedbacks.length,
            feedbacks: feedbacksWithNames,
        };
    }

    async getOfficeService(userOfficeCode) {
        if (!userOfficeCode) {
            throw new ErrorController('Office code is required', 400)
        }
        
        const services = await Service.find({ officeCode: userOfficeCode })
            .select('code name')
            .lean()
        
        return services
    }

    async getRenderedService(userOfficeCode, dateFrom, dateTo) {
        if (!userOfficeCode) {
            throw new ErrorController('Office code is required', 400)
        }

        if (!dateFrom || !dateTo) {
            throw new ErrorController('Date range is required', 400)
        }

        const startDate = new Date(dateFrom)
        const endDate = new Date(dateTo)

        endDate.setDate(endDate.getDate() + 1)

        const queue = await Queue.find({
            officeCode: userOfficeCode,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        })
        .select('selectedService generatedBy')
        .lean()

        const generatedByIds = queue.map(q => q.generatedBy)

        const users = await User.find({
            _id: { $in: generatedByIds }
        })
        .select('firstName middleName lastName')
        .lean()

        const userMap = new Map(
            users.map(user => [
                user._id.toString(),
                user
            ])
        )

        const result = queue.map(q => {
            const user = userMap.get(q.generatedBy.toString())

            return {
                ...q,
                generatedByName: user
                    ? `${user.firstName} ${user.middleName ?? ''} ${user.lastName}`.replace(/\s+/g, ' ').trim()
                    : null
            }
        })

        console.log(result)
        return result
    }

}

export default new AdminService