const {
    handleSendFriendRequest,

    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleCancelFriendRequest,
    handleGetFriendshipStatus,
    handleGetFriendsCount,
    handleGetFriends,
    handleGetReceivedFriendRequestList,
    handleGetSendFriendRequestList,
} = require("../../../controllers/http/friend.controller");

const router = require("express").Router();

router.get("/count/:userId", handleGetFriendsCount);
router.get("/list/:userId", handleGetFriends);
router.get("/request-receive/list/:userId", handleGetReceivedFriendRequestList);
router.get("/request-send/list/:userId", handleGetSendFriendRequestList);
router.post("/request/send", handleSendFriendRequest);
router.post("/request/accept", handleAcceptFriendRequest);
router.post("/request/reject", handleRejectFriendRequest);
router.post("/request/cancel", handleCancelFriendRequest);
router.post("/status", handleGetFriendshipStatus);

module.exports = router;
