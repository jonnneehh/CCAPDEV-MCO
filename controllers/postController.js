import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentsSchema.js"

const postController = {

    postPost: async function (req, res) {
        //console.log(req.file);
        //console.log(req.body);
        let data = {
           poster: req.user.username,
           caption: req.body.caption, 
           content: req.file.filename
           //layout: false
        }
        
        db.insertOne(Post, data, function (result) {
            db.findOne(User, {username: req.user.username}, {}, function () {
                db.updateOne(User, {username: req.user.username}, {$inc: {posts: 1}}, function () {
                    //console.log(result);
                    res.redirect("/");
                })
            }) 
        })
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
