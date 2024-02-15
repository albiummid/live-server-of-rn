const Friend = require("../database/models/Friend");
const ErrorHandler = require("../utils/errorHandler");

const sendFriendRequest = async (senderId, receiverId) => {
    const friendship = await getFriendship(senderId, receiverId);
    if (friendship.status == "Accepted") {
        throw new ErrorHandler(
            "Already Friend and friendship status : " + friendship.status,
            400
        );
    } else if (friendship.status == "Pending") {
        throw new ErrorHandler(
            "Already requested. Try again after cancelling it",
            400
        );
    } else if (friendship.status === "Rejected") {
        friendship.request_sender = senderId;
        friendship.request_receiver = receiverId;
        await friendship.save();
        return friendship;
    }

    return await Friend.create({
        request_receiver: receiverId,
        request_sender: senderId,
        uid_pair: [receiverId, senderId],
    });
};

const acceptFriendRequest = async (requestId, acceptorId) => {
    const request = await Friend.findById(requestId);
    if (!request.request_receiver == acceptorId) {
        throw new ErrorHandler(
            "Your are not authorized to accept the request",
            401
        );
    }
    request.status = "Accepted";
    await request.save();
};
const rejectFriendRequest = async (requestId, acceptorId) => {
    const request = await Friend.findById(requestId);
    if (!request.request_receiver == acceptorId) {
        throw new ErrorHandler(
            "Your are not authorized to accept the request",
            401
        );
    }
    request.status = "Rejected";
    await request.save();
};

const cancelFriendRequest = async (requestId, senderId) => {
    const friendship = await Friend.findById(requestId);
    if (friendship.request_sender !== senderId) {
        throw new ErrorHandler(
            "Your are not authorized to cancell the request",
            401
        );
    }
    await Friend.findByIdAndDelete(requestId);
    return true;
};

const getFriendship = async (senderId, receiverId) => {
    return await Friend.findOne({
        uid_pair: {
            $all: [senderId, receiverId], //$in like OR  -- $all like AND
        },
    });
};

module.exports = {
    getFriendship,
    cancelFriendRequest,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
};
