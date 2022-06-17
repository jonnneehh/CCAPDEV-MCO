import db from "../models/db.js";
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";
import mongoose from "mongoose";

const controller = {
    
    getFavicon: function (req, res) {
        res.status(204);
    },
    //TODO: Sort posts by date posted instead of reverse array
    getIndex: function (req, res) {
        // Returns array of Posts
        db.findMany(Post, {}, null, function (result) {
            // Reverses Posts array to show newer posts first
            result.reverse();
            res.render("home", {posts: result})
        }) 
    }

}

export default controller;