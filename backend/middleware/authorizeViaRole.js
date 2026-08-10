import ErrorController from '../controllers/ErrorController.js'

export const authorizeViaRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(new ErrorController('Access denied', 403));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new ErrorController('Insufficient permissions', 403));
        }

        next();
    };
};
