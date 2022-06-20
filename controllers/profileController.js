import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";

const profileController = {
    
    getProfile: function (req, res) {
        res.render("profile");
    },

}

export default profileController;