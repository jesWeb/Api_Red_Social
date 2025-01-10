const follow = require("../models/follow");

const followUserId = async (identityUserId) => {

    try {

        ///sacar info de procedimiento
        let following = await follow.find({
                "user": identityUserId
            })
            .select({
                "_id": 0,
                "followed": 1,

            })
            .exec();

        let followers = await follow.find({
                "user": identityUserId
            })
            .select({
                "_id": 0,
                "user": 1,

            })
            .exec();

        //procesar array de id

        let followingClean = [];
        followingClean.push(follow.followed);

        let followersClean = [];
        followersClean.push(follow.user);


        return {
            following: followingClean,
            followers: followersClean
        }
        // let followers = false;
    } catch (error) {


    }


}

const followUser = async (identityUserId, profileUserId) => {
    ///sacar info de procedimiento
    let following = await follow.findOne({
        "user": identityUserId,
        "followed": profileUserId
    })


    let followers = await follow.find({
        "user": profileUserId,
        "followed": identityUserId
    })

    return {
        following,
        followers
    }

}


module.export = {
    followUserId,
    followUser
}