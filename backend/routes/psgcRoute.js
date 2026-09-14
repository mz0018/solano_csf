import express from 'express'
import PsgcController from '../controllers/PsgcController.js'

const router = express.Router()

router.get('/regions', PsgcController.getPhilippineStandardGeographicCodes)
router.get('/regions/:regionCode/provinces', PsgcController.getPhilippineStandardGeographicCodes)
router.get('/provinces/:provinceCode/municipalities', PsgcController.getPhilippineStandardGeographicCodes)
router.get('/provinces/:provinceCode/municipalities/:municipalityCode/barangays', PsgcController.getPhilippineStandardGeographicCodes)

export default router