import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentsSchema.js"
import multer from "multer";
import upload from "../middlewares/upload.js";

const postController = {

    postPost: async function (req, res) {
        let postUpload = upload.single("content");

        postUpload(req, res, function (err) {
            //console.log(req.file);
            //console.log(req.body);

            if (req.file == undefined || req.file.filename == undefined || err || err instanceof multer.MulterError) {
                //console.log(err);
                req.flash("error", "Failed to upload file. Please select the correct file type and size. (jpg, jpeg, png, and gif. Max size 3mb)");
                res.redirect("/addpost");
            }
            else {
                let data = {
                    poster: req.user.username,
                    posterDP: req.user.profilephoto,
                    caption: req.body.caption, 
                    content: req.file.filename
                }
                
                db.insertOne(Post, data, function (newPost) { 
                    
                    db.findOne(User, {username: req.user.username}, {}, function (currentUser) {
                        currentUser.posts.push(newPost);
                        currentUser.save();
                        console.log(currentUser.posts);
                        res.redirect("/");
                    })
                })
            }
        })
        
    },

    deletePost: function (req, res) {
        console.log("Post deleted");
        res.redirect("/");
        
    },

    getPost: function (req, res) {
        res.render("addpost");
    },

    addComment: function (req, res) {
        var commentdata = {
            commentOwner: req.user.username,
            commentOwnerDP: req.user.profilephoto,
            content: req.query.content,
            postOwner: req.query.postOwner
        }

        try {
            db.insertOne(Comment, commentdata, function (newcomment) {
                db.findOne(Post, { _id: newcomment.postOwner }, {}, (parentpost) => {

                    if (!parentpost) {
                        console.log("Cannot find post")
                        return;
                    } else {
                        console.log("Parent Post: " + parentpost)
                    }

                    var ogcomments = parentpost.comments;
                    ogcomments.push(newcomment);

                    console.log("New comments JSON: " + ogcomments);

                    db.updateOne(Post, { _id: newcomment.postOwner }, { comments: ogcomments }, (isPostUpdated) => {
                        if (isPostUpdated) console.log("Successfully added the comment ID to the post!");
                    })
                })
                res.render('partials\\comment', newcomment, (err, html) => {
                    res.send(html);
                });
            })
        }
        catch (e) {
            console.error(e);
        }
    },
}

export default postController;
