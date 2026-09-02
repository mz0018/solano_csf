import QueueService from '../services/QueueService.js'
import Region from '../models/regions.model.js'
import Province from '../models/provinces.model.js'
import Municipality from '../models/municipalities.model.js'

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

  async getGeographicOptions(req, res, next) {
    try {
      const [regions, provinces, municipalities] = await Promise.all([
        Region.find({}).sort({ name: 1 }).select('name code').lean(),
        Province.find({}).sort({ name: 1 }).select('name code').lean(),
        Municipality.find({}).sort({ name: 1 }).select('name code type').lean()
      ])

      res.status(200).json({
        regions: regions.map((region) => ({ name: region.name, code: region.code })),
        provinces: provinces.map((province) => ({ name: province.name, code: province.code })),
        municipalities: municipalities.map((municipality) => ({ name: municipality.name, code: municipality.code, type: municipality.type }))
      })
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