const {
    handleGetFollowerCount,
    handleGetIsFollowing,
    handleDoFollow,
    handleDoUnFollow,
} = require("../../../controllers/http/follow.controller");

const router = require("express").Router();

router.get("/count/:followeeId", handleGetFollowerCount);
router.get("/followers/:followeeId", handleGetFollowerCount);
router.get("/check-is-following/:followeeId/:followerId", handleGetIsFollowing);
router.post("/do-follow", handleDoFollow);
router.post("/do-unfollow", handleDoUnFollow);

module.exports = router;
