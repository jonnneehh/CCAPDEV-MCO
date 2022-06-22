import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";

const profileController = {
    
    getUserProfile: function (req, res) {
        db.findOne(User, {username: req.params.username}, {}, function (result) {
            db.findMany(Post, {poster: req.params.username}, {}, function (result2) {
                result2.reverse();
                res.render("profile", {userinfo: result, posts: result2});
            })
        })
    }

}

export default profileController;
