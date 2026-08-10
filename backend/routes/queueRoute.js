import express from 'express'
import QueueController from '../controllers/QueueController.js'

import { validate } from '../middleware/validate.js'
import { feedbackSchema } from '../schemas/feedback.schema.js'
import { verifyQueueRateLimiter } from '../middleware/verifyQueueLimiter.js'
import { savingFeedbackLimiter } from '../middleware/savingFeedbackLimiter.js'

const router = express.Router()

router.get('/verify', verifyQueueRateLimiter, QueueController.verifyQueue)
router.post('/feedback', savingFeedbackLimiter, validate(feedbackSchema), QueueController.saveFeedback);

export default router