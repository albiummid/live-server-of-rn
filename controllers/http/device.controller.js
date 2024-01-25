const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const { bindDevice } = require("../../services/device.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleDeviceHandshake: catchAsyncErrors(async (req, res) => {
        const device = await bindDevice({
            ...req.body,
            req: req,
        });
        resHTTP("Handshake Successful", { device }, res, 200);
    }),
};
