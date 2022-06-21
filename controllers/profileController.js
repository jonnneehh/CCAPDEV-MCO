import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";

const profileController = {
    
    getProfile: function (req, res) {

        // Show user info
        db.findOne(User, {username: req.user.username}, {}, function (result) {
            db.findMany(Post, {poster: req.user.username}, {}, function (result2) {
                result2.reverse();
                res.render("profile", {userinfo: result, posts: result2})
            });
        });

    },

}

export default profileController;
