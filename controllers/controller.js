import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentsSchema.js"
import mongoose from "mongoose";

const controller = {
    
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {
        // Returns array of Posts
        Post.find().lean()

        db.findManyToJSON(Post, {}, null, async function (res_posts) {
            for(let post of res_posts){
                var commentsdata = [];
                for(let commentid of post.comments){
                    let c = await addComment(commentid);
                    commentsdata.push(c);
                }
                post.comments = commentsdata;
            }
            // Reverses Posts array to show newer posts first
            res_posts.reverse();
            console.log("AFTER res_posts: " + res_posts)
            res.render("home", {posts: res_posts})
        }) 

        function addComment(commentid){
            return new Promise((resolve, reject)=>{
                db.findOne(Comment, {_id: commentid}, null, function(res_comment){
                    resolve(res_comment) 
                })
            })
        }

        function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
    }
}
export default controller;
