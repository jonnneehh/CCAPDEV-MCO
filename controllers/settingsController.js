import db from "../models/db.js";
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";

const settingsController = {
    
    getSettings: function (req, res) {
        res.render("settings");
    },

}

export default settingsController;