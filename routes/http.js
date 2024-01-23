const v1_router = require("express").Router();
const v2_router = require("express").Router();

// v1 Routes
v1_router.use("/auth/device", require("./http/v1/auth/device.router"));
v1_router.use("/auth/signIn", require("./http/v1/auth/signIn.router"));

module.exports = {
    v1_router,
    v2_router,
};
