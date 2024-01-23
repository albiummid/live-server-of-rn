const { JWT_SECRET } = require("../app.config");
const AuthSession = require("../database/models/AuthSession");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const { terminationKinds } = require("../data/enums");
const getSeesionStartLog = (request) => {
    return {
        at: Date.now(),
        ip:
            request.ip ||
            request.headers["x-forwarded-for"] ||
            request.connection.remoteAddress,
        user_agent: request.headers["user-agent"]
            ? request.headers["user-agent"]
            : "",
    };
};
const createSession = async ({ request, user_id }) => {
    await terminateLastSession({ request, user_id });
    const sessionToken = await getJWT({
        user_id,
        device_token: request.info.device_token,
    });

    return await AuthSession.create({
        session_token: sessionToken,
        device_token: request.info.device_token,
        user_id,
        start_log: getSeesionStartLog(request),
        request: request.info._id,
    });
};

const terminateLastSession = async ({ terminationKind, request, user_id }) => {
    const session = await AuthSession.findOne({
        user_id,
        end_log: {
            at: null,
        },
    });
    if (session) {
        await AuthSession.findByIdAndUpdate(session._id, {
            end_log: {
                at: Date.now(),
                ip:
                    request.ip ||
                    request.headers["x-forwarded-for"] ||
                    request.connection.remoteAddress,
                user_agent: request.headers["user-agent"]
                    ? request.headers["user-agent"]
                    : "",
                kind: terminationKind,
                by: user_id,
                device_token: request.info.device_token,
            },
        });
    }
};

async function getJWT(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7 days" });
}

const signInWithGoogle = async ({ request, properties }) => {
    let user = await User.findOne({
        email: properties.email,
        auth_kind: "Google",
    });
    if (!user) {
        // NEW USER
        user = await User.create({
            auth_kind: "Google",
            auth_properties: properties,
            email: properties.email,
            name: properties.name,
        });
        const session = await createSession({
            request,
            user_id: user._id,
        });
        return {
            access_token: session.session_token,
            user_id: session.user_id,
        };
    }
    // Existing User

    const session = await createSession({
        request,
        user_id: user._id,
    });
    return {
        access_token: session.session_token,
        user_id: session.user_id,
    };
};
const signInWithFacebook = async ({ request, properties }) => {
    let user = await User.findOne({
        email: properties.email,
        auth_kind: "Facebook",
    });
    if (!user) {
        // NEW USER
        user = await User.create({
            auth_kind: "Facebook",
            auth_properties: properties,
            email: properties.email,
            name: properties.name,
        });
        const session = await createSession({
            request,
            user_id: user._id,
        });
        return {
            access_token: session.session_token,
            user_id: session.user_id,
        };
    }
    // Existing User

    const session = await createSession({
        request,
        user_id: user._id,
    });
    return {
        access_token: session.session_token,
        user_id: session.user_id,
    };
};

const logoutUser = async ({ req }) => {
    const { user_id } = req.info;
    await terminateLastSession({
        terminationKind: terminationKinds.Logout,
        request,
    });
};

module.exports = {
    createSession,
    signInWithFacebook,
    signInWithGoogle,
};
