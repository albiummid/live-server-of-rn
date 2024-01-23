const {
    handleSignInWithGoogle,
    handleSignInWithFacebook,
} = require("../../../../controllers/http/auth.controller");

const router = require("express").Router();

router.post("/google", handleSignInWithGoogle);
router.post("/facebook", handleSignInWithFacebook);

module.exports = router;
