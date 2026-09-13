import PsgcService from '../services/PsgcService.js'

class PhilippineStandardGeographicCodeController {

    async getPhilippineStandardGeographicCodes(req, res, next) {
        try {
            const {
                regionCode,
                provinceCode,
                municipalityCode
            } = req.params

            let data

            if (municipalityCode) {
                data = await PsgcService.getBarangays(
                    municipalityCode,
                    provinceCode
                )
            } else if (provinceCode) {
                data = await PsgcService.getMunicipalities(
                    provinceCode
                )
            } else if (regionCode) {
                data = await PsgcService.getProvinces(
                    regionCode
                )
            } else {
                data = await PsgcService.getRegions()
            }

            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new PhilippineStandardGeographicCodeController()
