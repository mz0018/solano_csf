import AdminService from '../services/AdminService.js'

class AdminController {
    async generateTicket(req, res, next) {
        try {
            const ticket = await AdminService.generateTicket(req.user_id, req.body.count)
            res.status(201).json({ ticket })
        } catch (error) {
            next(error)
        }
    }

    async getActiveQueueByDate(req, res, next) {
        try {
            const dateToday = new Date();
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await AdminService.getActiveQueueByDateService(dateToday, req.user, page, limit);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getDetailedFeedback(req, res, next) {
        try {
            const { code } = req.params
            const result = await AdminService.getDetailedFeedbackByCode(code)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getOffices(req, res, next) {
        try {
            const offices = await AdminService.getOffices()
            res.status(200).json(offices)
        } catch (error) {
            next(error)
        }
    }

    async getOfficeFeedbacks(req, res, next) {
        try {
            const { officeCode, month, year, page, limit } = req.query
            const result = await AdminService.getOfficeFeedbacksByDate(officeCode, month, year, page, limit)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getReportStatistics(req, res, next) {
        try {
            const { officeCode, dateFrom, dateTo } = req.query;
            const result = await AdminService.getReportStatisticsByDate(officeCode, dateFrom, dateTo);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new AdminController()