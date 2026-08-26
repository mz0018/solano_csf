import jwt from 'jsonwebtoken'
// import UserService from '../services/UserService.js'
import SuperAdminService from '../services/SuperAdminService.js'

class SuperAdminController {

    searchClient = async (req, res, next) => {
        try {
            const result = await SuperAdminService.searchClient(req.query.search)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    getClient = async (req, res, next) => {
        try {
            const result = await SuperAdminService.getClient(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    authorizePasswordReset = async (req, res, next) => {
        try {
            const result = await SuperAdminService.resetClientPassword(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    updateClientStatus = async (req, res, next) => {
        try {
            const result = await SuperAdminService.updateClientStatus(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

}

export default new SuperAdminController()