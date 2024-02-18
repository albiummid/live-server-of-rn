const Follow = require("../database/models/Follow");
const ErrorHandler = require("../utils/errorHandler");
const queryHelper = require("../utils/queryHelper");

module.exports = {
    getFollowers: async function (followeeId, query = {}) {
        return await queryHelper(Follow, { followee: followeeId, ...query });
    },
    getFollowerCount: async function (followeeId) {
        return await Follow.countDocuments({ followee: followeeId });
    },
    getIsFollowing: async function (followeeId, followerId) {
        return {
            isFollowing: Boolean(
                await Follow.findOne({
                    followee: followeeId,
                    follower: followerId,
                })
            ),
        };
    },
    doFollow: async function (followeeId, followerId) {
        if ((await this.getIsFollowing(followeeId, followerId)).isFollowing) {
            throw new ErrorHandler("Already following", 400);
        }
        return await Follow.create({
            followee: followeeId,
            follower: followerId,
        });
    },
    doUnFollow: async function (followeeId, followerId) {
        const follow = await Follow.findOne({
            followee: followeeId,
            follower: followerId,
        });
        if (!follow) {
            throw new ErrorHandler("Not following", 400);
        }
        await Follow.findByIdAndDelete(follow._id);
    },
};
