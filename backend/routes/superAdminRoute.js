import express from 'express'
import SuperAdminController from '../controllers/SuperAdminController.js'

import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'
import { authorizeViaRole } from '../middleware/authorizeViaRole.js'

const router = express.Router()

router.get(
    '/clients', 
    authorizeViaCookie, 
    authorizeViaRole('super_admin'), 
    SuperAdminController.searchClient
)

router.get(
    '/clients/:id',
    authorizeViaCookie,
    authorizeViaRole('super_admin'),
    SuperAdminController.getClient
)

router.post(
    '/password/reset/:id', 
    authorizeViaCookie,
    authorizeViaRole('super_admin'),
    SuperAdminController.authorizePasswordReset
)

router.post(
    '/client/status/:id', 
    authorizeViaCookie,
    authorizeViaRole('super_admin'),
    SuperAdminController.updateClientStatus
)

router.get(
    '/ticket-tracker',
    authorizeViaCookie,
    authorizeViaRole('super_admin'),
    SuperAdminController.getTicketTracker
)

export default router