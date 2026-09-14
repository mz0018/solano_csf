import QueueService from '../services/QueueService.js'

class QueueController {
  async verifyQueue(req, res, next) {
    try {
      const { code } = req.query
      if (!code) return res.status(400).json({ message: 'Queue code is required' })
      const result = await QueueService.verifyQueue(code)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async saveFeedback(req, res, next) {
    try {
      const formData = req.body
      const queueNumber = req.body.queueNumber

      const result = await QueueService.saveFeedback(formData, queueNumber)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

}
export default new QueueController()