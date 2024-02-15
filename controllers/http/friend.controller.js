const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendship,
} = require("../../services/friend.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleSendFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await sendFriendRequest(
            req.body.senderId,
            req.body.receiverId
        );
        resHTTP("Friend request sent", request, res, 201);
    }),
    handleAcceptFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await acceptFriendRequest(
            req.body.requestId,
            req.body.acceptorId
        );
        resHTTP("Friend request accepted", request, res, 201);
    }),
    handleAcceptFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await acceptFriendRequest(
            req.body.requestId,
            req.body.acceptorId
        );
        resHTTP("Friend request accepted", request, res, 201);
    }),
    handleRejectFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await rejectFriendRequest(
            req.body.requestId,
            req.body.acceptorId
        );
        resHTTP("Friend request rejected", request, res, 201);
    }),
    handleCancelFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await rejectFriendRequest(
            req.body.requestId,
            req.body.acceptorId
        );
        resHTTP("Friend request cancelled", request, res, 201);
    }),
    handleGetFriendshipStatus: catchAsyncErrors(async (req, res) => {
        const request = await getFriendship(req.body.uid1, req.body.uid2);
        resHTTP("Friend request cancelled", request, res, 201);
    }),
};
