import express from 'express'
import AdminController from '../controllers/AdminController.js'
import { validate } from '../middleware/validate.js'
import { cacheHeaders } from '../middleware/cacheHeaders.js'
import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'
import { authorizeViaRole } from '../middleware/authorizeViaRole.js'

const router = express.Router()

router.post(
    '/generate-ticket',
    authorizeViaCookie,
    authorizeViaRole('office_admin', 'hr_admin', 'super_admin'),
    AdminController.generateTicket
)

router.get(
    '/active-queue',
    authorizeViaCookie,
    authorizeViaRole('office_admin', 'hr_admin', 'super_admin'),
    AdminController.getActiveQueueByDate
)

router.get(
    '/feedback/:code',
    authorizeViaCookie,
    authorizeViaRole('office_admin', 'hr_admin', 'super_admin'),
    AdminController.getDetailedFeedback
)

router.get(
    '/offices',
    authorizeViaCookie,
    authorizeViaRole('hr_admin', 'super_admin'),
    AdminController.getOffices
)

router.get(
    '/office-feedbacks',
    authorizeViaCookie,
    authorizeViaRole('hr_admin', 'super_admin'),
    AdminController.getOfficeFeedbacks
)

router.get(
    '/report-statistics',
    authorizeViaCookie,
    authorizeViaRole('hr_admin', 'super_admin'),
    AdminController.getReportStatistics
)

export default router