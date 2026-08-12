import express from 'express'
import UserController from '../controllers/UserController.js'
import SuperAdminController from '../controllers/SuperAdminController.js'

import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'

const router = express.Router()

router.post('/password/reset/:id', SuperAdminController.authorizePasswordReset)

export default router