const {
    handleGetUserByUID,
    handleUpdateUsersBasicInfo,
} = require("../../../controllers/http/user.controller");

const router = require("express").Router();

router.get("/find-by-id/:id", handleGetUserByUID);
router.post("/update-basic-info/:id", handleUpdateUsersBasicInfo);

module.exports = router;
