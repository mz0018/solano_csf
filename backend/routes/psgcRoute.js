import express from 'express'
import PsgcController from '../controllers/PsgcController'


const router = express.Router()

router.get(
    '/get-psgc',
    PsgcController.getPhilippineStandardGeographicCodes
)

export default router