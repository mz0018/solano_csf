import express from 'express'
import UserController from '../controllers/UserController.js'

import { signupSchema, changePasswordSchema } from '../schemas/user.schema.js'
import { validate } from '../middleware/validate.js'
import { authorizeViaCookie } from '../middleware/authorizeViaCookie.js'
import { authorizeViaRole } from '../middleware/authorizeViaRole.js'
import { signinRateLimiter } from '../middleware/signinRateLimiter.js'
import { signupRateLimiter } from '../middleware/signupRateLimiter.js'
import { changePasswordRateLimiter } from '../middleware/changePasswordLimiter.js'

const router = express.Router()

router.get('/verify', authorizeViaCookie, UserController.verifyUser)
router.post('/signup', validate(signupSchema), signupRateLimiter, UserController.signupUser)
router.post('/signin', signinRateLimiter, UserController.signinUser)
router.post('/signout', UserController.signoutUser)
router.post('/change-password', authorizeViaCookie, validate(changePasswordSchema), authorizeViaRole('office_admin', 'hr_admin'), changePasswordRateLimiter, UserController.changePassword)
router.get('/login-history', authorizeViaCookie, authorizeViaRole('office_admin', 'hr_admin'), UserController.getLoginHistory)

export default router