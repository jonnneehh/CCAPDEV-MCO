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

    addUpvote: function (req, res) {
        var isPost = req.query.isPost;
        console.log("isPost: " + isPost);

        if (isPost === "true") {
            console.log("Post upvote detected!")
            
            //Adds the id number of the upvoted post to User.upvotedPosts
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newUpvotedPosts = user.upvotedPosts;

                if(newUpvotedPosts.includes(req.query._id) == false){
                    //Adds the post id to User.upvotedPosts
                    newUpvotedPosts.push(req.query._id);

                    //If the post is part of User.downvotedPosts, remove it
                    var newDownvotedPosts = user.downvotedPosts;
                    if(newDownvotedPosts.includes(req.query._id)){
                        console.log("Removing this post from downvoted posts...");
                        newDownvotedPosts.pop(req.query._id);
                    }

                    //Put the new upvoted and downvoted posts as data to prepare to access database
                    var posts = {
                        downvotedPosts: newDownvotedPosts,
                        upvotedPosts: newUpvotedPosts
                    }

                    db.updateOne(User, {username: req.user.username}, posts, (status)=>{
                        if(status){
                            console.log("New post added to upvotedPosts of user");
                        }
                    }) 

                    //Updates number of likes in the post database
                    db.updateOne(Post, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })

                    //If the post is part of User.downvotedPosts, remove it
                } 
                else{
                    console.log("This post was already upvoted! cancelling update...")
                }
            })
        }
        else {
            console.log("Comment upvote detected!")

            //Adds the id number of the upvoted post to User.upvotedComments
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newUpvotedComments = user.upvotedComments;

                if(newUpvotedComments.includes(req.query._id) == false){
                    //Adds the post id to User.upvotedComments
                    newUpvotedComments.push(req.query._id);

                    //If the post is part of User.downvotedComments, remove it
                    var newDownvotedComments = user.downvotedComments;
                    if(newDownvotedComments.includes(req.query._id)){
                        console.log("Removing this comment from downvoted comments...");
                        newDownvotedComments.pop(req.query._id);
                    }

                    //Put the new upvoted and downvoted comments as data to prepare to access database
                    var comments = {
                        downvotedComments: newDownvotedComments,
                        upvotedComments: newUpvotedComments
                    }

                    db.updateOne(User, {username: req.user.username}, comments, (status)=>{
                        if(status){
                            console.log("New comment added to upvotedComments of user");
                        }
                    })

                    //Updates number of likes in the comment database
                    db.updateOne(Comment, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })
                }
                else{
                    console.log("This comment was already upvoted! cancelling update...")
                }
            })
        }
    },

    removeUpvote: function (req, res) {
        var isPost = req.query.isPost;
        console.log("isPost: " + isPost);

        if (isPost === "true") {
            console.log("Post remove upvote detected!")
            
            //Adds the id number of the upvoted post to User.upvotedPosts
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newUpvotedPosts = user.upvotedPosts;

                if(newUpvotedPosts.includes(req.query._id) == true){
                    newUpvotedPosts.pop(req.query._id);
                    db.updateOne(User, {username: req.user.username}, {upvotedPosts: newUpvotedPosts}, (status)=>{
                        if(status){
                            console.log("New post removed to upvotedPosts of user");
                        }
                    })

                    //Updates number of likes in the post database
                    db.updateOne(Post, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })
                } 
                else{
                    console.log("This post was never upvoted! cancelling update...")
                }
            })
        }
        else {
            console.log("Comment remove upvote detected!")

            //Adds the id number of the upvoted post to User.upvotedPosts
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newUpvotedComments = user.upvotedComments;

                if(newUpvotedComments.includes(req.query._id) == true){
                    newUpvotedComments.pop(req.query._id);

                    db.updateOne(User, {username: req.user.username}, {upvotedComments: newUpvotedComments}, (status)=>{
                        if(status){
                            console.log("Comment removed to upvotedComments of user");
                        }
                    })

                    //Updates number of likes in the comment database
                    db.updateOne(Comment, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })
                }
                else{
                    console.log("This comment was never upvoted! cancelling update...")
                    return;
                }
            })
        }
    },

    addDownvote: function (req, res) {
        var isPost = req.query.isPost;
        console.log("isPost: " + isPost);

        if (isPost === "true") {
            console.log("Post downvote detected!")
            
            //Adds the id number of the downvoted post to User.downvotedPosts
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newDownvotedPosts = user.downvotedPosts;

                if(newDownvotedPosts.includes(req.query._id) == false){
                    //Adds the post id to User.downvotedPosts
                    newDownvotedPosts.push(req.query._id);

                    //If the post is part of User.upvotedPosts, remove it
                    var newUpvotedPosts = user.upvotedPosts;
                    if(newUpvotedPosts.includes(req.query._id)){
                        console.log("Removing this post from upvoted posts...");
                        newUpvotedPosts.pop(req.query._id);
                    }

                    //Put the new upvoted and downvoted posts as data to prepare to access database
                    var posts = {
                        downvotedPosts: newDownvotedPosts,
                        upvotedPosts: newUpvotedPosts
                    }

                    //UPDATING THE DATABASE
                    db.updateOne(User, {username: req.user.username}, posts, (status)=>{
                        if(status){
                            console.log("New post added to downvotedPosts of user");
                        }
                    })

                    //Updates number of likes in the post database
                    db.updateOne(Post, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })

                    
                } 
                else{
                    console.log("This post was already downvoted! cancelling update...")
                }
            })
        }
        else {
            console.log("Comment downvote detected!")

            //Adds the id number of the downvoted comment to User.downvotedComments
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newDownvotedComments = user.downvotedComments;

                if(newDownvotedComments.includes(req.query._id) == false){
                    //Adds the post id to User.upvotedComments
                    newDownvotedComments.push(req.query._id);

                    //If the post is part of User.downvotedComments, remove it
                    var newUpvotedComments = user.upvotedComments;
                    if(newUpvotedComments.includes(req.query._id)){
                        console.log("Removing this comment from downvoted comments...");
                        newUpvotedComments.pop(req.query._id);
                    }

                    //Put the new upvoted and downvoted comments as data to prepare to access database
                    var comments = {
                        downvotedComments: newDownvotedComments,
                        upvotedComments: newUpvotedComments
                    }

                    db.updateOne(User, {username: req.user.username}, comments, (status)=>{
                        if(status){
                            console.log("New comment added to downvotedComments of user");
                        }
                    })

                    //Updates number of likes in the comment database
                    db.updateOne(Comment, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })

                    //If the comment is part of User.upvotedComments, remove it
                }
                else{
                    console.log("This comment was already downvoted! cancelling update...")
                }
            })
        }
    },

    removeDownvote: function (req, res) {
        var isPost = req.query.isPost;
        console.log("isPost: " + isPost);

        if (isPost === "true") {
            console.log("Post remove downvote detected!")
            
            //Adds the id number of the downvoted post to User.downvotedPosts
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newDownvotedPosts = user.downvotedPosts;

                if(newDownvotedPosts.includes(req.query._id) == true){
                    newDownvotedPosts.pop(req.query._id);
                    db.updateOne(User, {username: req.user.username}, {downvotedPosts: newDownvotedPosts}, (status)=>{
                        if(status){
                            console.log("New post removed to downvotedPosts of user");
                        }
                    })

                    //Updates number of likes in the post database
                    db.updateOne(Post, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })
                } 
                else{
                    console.log("This post was never downvoted! cancelling update...")
                    return;
                }
            })
        }
        else {
            console.log("Comment remove downvote detected!")

            //Adds the id number of the downvoted comments to User.downvotedComments
            db.findOne(User, {username: req.user.username}, {}, (user)=>{
                var newDownvotedComments = user.downvotedComments;

                if(newDownvotedComments.includes(req.query._id) == true){
                    newDownvotedComments.pop(req.query._id);

                    db.updateOne(User, {username: req.user.username}, {downvotedComments: newDownvotedComments}, (status)=>{
                        if(status){
                            console.log("Comment removed to downvotedComments of user");
                        }
                    })

                    //Updates number of likes in the comment database
                    db.updateOne(Comment, { _id: req.query._id }, { likes: req.query.likes }, (status) => {
                        if(!status){
                            console.log("Update failed...")
                        }
                    })
                }
                else{
                    console.log("This comment was never downvoted! cancelling update...")
                    return;
                }
            })
        }
    },

}

export default postController;
