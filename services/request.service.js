const Request = require("../database/models/Request");

const createRequest = async ({ request, device_token, user_id, kind }) => {
    return await Request.create({
        at: Date.now(),
        ip:
            request.ip ||
            request.headers["x-forwarded-for"] ||
            request.connection.remoteAddress,
        user_agent: request.headers["user-agent"]
            ? request.headers["user-agent"]
            : "",
        referer: request.headers["referer"] || request.headers["referrer"],
        device_token,
        kind,
        user_id,
    });
};

module.exports = {
    createRequest,
};
