const Friend = require("../database/models/Friend");
const ErrorHandler = require("../utils/errorHandler");
const queryHelper = require("../utils/queryHelper");

const findById = async (reqId, throwError = true) => {
    const item = await Friend.findById(reqId);
    if (throwError && !item) {
        throw new ErrorHandler("Invalid id for accepting the request", 400);
    }
    return item;
};

const sendFriendRequest = async (senderId, receiverId) => {
    const friendship = await getFriendship(senderId, receiverId);

    if (!friendship) {
        return await Friend.create({
            request_receiver: receiverId,
            request_sender: senderId,
            uid_pair: [receiverId, senderId],
            status: "Pending",
        });
    } else if (friendship.status === "Rejected") {
        friendship.request_sender = senderId;
        friendship.request_receiver = receiverId;
        await friendship.save();
        return friendship;
    } else if (friendship.status == "Accepted") {
        throw new ErrorHandler(
            "Already Friend and friendship status : " + friendship.status,
            400
        );
    } else if (friendship.status == "Pending") {
        throw new ErrorHandler(
            "Already requested. Try again after cancelling it",
            400
        );
    }
};

const getFriendsCount = async (userId) => {
    return await Friend.countDocuments({
        uid_pair: {
            $in: [userId],
        },
    });
};

const acceptFriendRequest = async (requestId, acceptorId) => {
    const request = await findById(requestId);
    if (!request.request_receiver == acceptorId) {
        throw new ErrorHandler(
            "Your are not authorized to accept the request",
            401
        );
    } else if (request.status !== "Pending") {
        throw new ErrorHandler("The friend request not acceptable", 400);
    }

    console.log(request);
    request.status = "Accepted";
    await request.save();
};
const rejectFriendRequest = async (requestId, acceptorId) => {
    const request = await findById(requestId);
    if (request.status !== "Pending") {
        throw new ErrorHandler("Request is not rejectable.", 400);
    }
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
    const friendship = await findById(requestId);
    if (friendship.status !== "Pending") {
        throw new ErrorHandler("Request is not cancellable");
    }
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

const getFriendList = async (userId, query = {}) => {
    return await queryHelper(Friend, {
        status: "Accepted",
        uid_pair: {
            $in: [userId],
        },
        ...query,
    });
};
const getFriendRequestReceiveList = async (userId, query = {}) => {
    return await queryHelper(Friend, {
        status: "Pending",
        request_receiver: userId,
        ...query,
    });
};
const getFriendRequestSendList = async (userId, query = {}) => {
    return await queryHelper(Friend, {
        status: "Pending",
        request_sender: userId,
        ...query,
    });
};

module.exports = {
    getFriendship,
    getFriendList,
    getFriendRequestSendList,
    getFriendRequestReceiveList,
    cancelFriendRequest,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendsCount,
};
