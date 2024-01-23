const dotenv = require("dotenv");
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "@lb!##eNcRYpted##";

const schemaOptions = {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
};

module.exports = {
    NODE_ENV,
    PORT,
    JWT_SECRET,
    wildRoutes: ["/auth/device/resolve", "/auth/device/handshake"],
    nonAuthenticatedRoutes: [
        "/auth/signIn/google",
        "/auth/signIn/facebook",
        // "/auth/sign-up/credential",
    ],
    appName: "Digo_Live_SERVER",
    schemaOptions,
    database: {
        provider: "MongoDB",
        name: "digo_live_db",
        database_url: "mongodb://127.0.0.1:27017/digo_live_db",
    },
    apiURI: `http://localhost:${PORT}`,
};
