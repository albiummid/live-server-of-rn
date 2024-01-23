const Device = require("../database/models/Device");
const uuid = require("uuid").v4;

const bindDevice = async ({
    request,
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
        request: request.info._id,
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

module.exports = {
    bindDevice,
};
