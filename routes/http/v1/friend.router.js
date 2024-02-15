const {
    handleSendFriendRequest,
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleCancelFriendRequest,
    handleGetFriendshipStatus,
} = require("../../../controllers/http/friend.controller");

const router = require("express").Router();

router.post("/request/send", handleSendFriendRequest);
router.post("/request/accept", handleAcceptFriendRequest);
router.post("/request/reject", handleRejectFriendRequest);
router.post("/request/cancel", handleCancelFriendRequest);
router.post("/status", handleGetFriendshipStatus);

module.exports = router;
