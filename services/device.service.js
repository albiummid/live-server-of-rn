const Device = require("../database/models/Device");
const uuid = require("uuid").v4;

const bindDevice = async ({
    req,
    advertisement_id,
    app_set_id,
    fcm_token,
    fid,
    kind,
    local_id,
    properties,
    source,
}) => {
    return await Device.create({
        req: req.info._id,
        advertisement_id,
        app_set_id,
        device_token: uuid(),
        fcm_token,
        fid,
        kind,
        local_id,
        properties,
        source,
    });
};

const isDeviceBinded = async (token) => {
    return (
        (await Device.findOne({
            device_token: token,
        })) !== null
    );
};

module.exports = {
    bindDevice,
    isDeviceBinded,
};
