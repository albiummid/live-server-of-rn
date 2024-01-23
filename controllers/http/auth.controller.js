const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    signInWithGoogle,
    signInWithFacebook,
} = require("../../services/auth.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleSignInWithGoogle: catchAsyncErrors(async (req, res) => {
        const { properties } = req.body;
        const authData = await signInWithGoogle({ properties, request: req });
        resHTTP("You are logged in !", authData, res, 200);
    }),
    //
    handleSignInWithFacebook: catchAsyncErrors(async (req, res) => {
        const { properties } = req.body;
        const authData = await signInWithFacebook({ properties, request: req });
        resHTTP("You are logged in !", authData, res, 200);
    }),
};
