const { wildRoutes, nonAuthenticatedRoutes } = require("../app.config");
const { createRequest } = require("../services/request.service");
const uuid = require("uuid").v4;
// const {
//     nonSessionAuthorization,
//     sessionAuthorization,
//     userRoleAuthorization,
// } = require("../services/auth.service");
const ErrorHandler = require("../utils/errorHandler");
// Checks if user is authenticated or not
exports.checkAuth = async (req, res, next) => {
    const route = req.path;
    const userId = req.headers["x-uuid"];
    const deviceToken = req.headers["x-device-token"];
    req.info = await createRequest({
        request: req,
        device_token: deviceToken,
        kind: "Rest API",
        user_id: userId,
    });

    // check if route is in wild routes
    if (wildRoutes.includes(route)) {
        next();
    } else {
        // check if route is in non authenticated routes
        if (!nonAuthenticatedRoutes.includes(route)) {
            // authenticated route
            const auth = req.headers["authorization"];
            if (!auth) {
                next(new ErrorHandler("AUTHORIZATION_HEADER_NOT_FOUND"));
            }
            const sessionToken = auth?.split(" ")[1];

            if (![sessionToken, userId, deviceToken].every(Boolean)) {
                next(
                    new ErrorHandler("::__HEADER_PARAMETERS_ARE_MISSING", 400)
                );
            }
            // const isValidSession = sessionAuthorization({
            //     session_token: sessionToken,
            //     user_id: userId,
            //     device_token: deviceToken,
            // });

            // if (!isValidSession) {
            //     next(new ErrorHandler("__SESSION_INVALID", 400));
            // }

            // const authorizedUser = userRoleAuthorization({
            //     user_id: userId,
            // });

            // if (!authorizedUser) {
            //     next(new ErrorHandler("__INVALID_USER", 400));
            // }
            // req.info = authorizedUser;
            next();
        } else {
            // non authenticated route
            const deviceToken = req.headers["x-device-token"];
            if (!deviceToken) {
                next(new ErrorHandler("::__DEVICE_TOKEN_NOT_FOUND", 401));
            } else {
                // temp
                next();
            }
            // const isValidToken = nonSessionAuthorization({
            //     device_token: deviceToken,
            // });

            // if (isValidToken) {
            //     next();
            // } else {
            //     next(new ErrorHandler("Invalid token .", 401));
            // }
        }
    }
};
