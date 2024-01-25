const v1_router = require("express").Router();
const v2_router = require("express").Router();

// v1 Routes
v1_router.use("/auth/device", require("./http/v1/device.router"));
v1_router.use("/auth", require("./http/v1/auth.router"));
v1_router.use("/user", require("./http/v1/user.router"));

module.exports = {
    v1_router,
    v2_router,
};
