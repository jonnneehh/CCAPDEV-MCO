import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentsSchema.js";

const profileController = {
    
    getUserProfile: async function (req, res) {
        //var user = await user();
        db.findOne(User, {username: req.params.username}, {}, function (userinfo) {
            db.findManyToJSON(Post, {poster: req.params.username}, null, async function (res_posts) {
                for(let post of res_posts){
                    //Add the comments for each post
                    var commentsdata = [];
                    for(let commentid of post.comments){
                        //Add the blue and red updoots and downdoots
                        var votedata = {
                            isUpvoted: false,
                            isDownvoted: false
                        }
                        if(req.user){
                            if(req.user.upvotedComments.includes(commentid)){
                                votedata.isUpvoted = true;
                            }
                            else if(req.user.downvotedComments.includes(commentid)){
                                votedata.isDownvoted = true;
                            }
                        }
    
                        let c = await addComment(commentid); //Finds commentid
                        Object.assign(c, votedata); //Appends votedata to c
                        commentsdata.push(c);
                    }
                    post.comments = commentsdata;
    
                    //Add the blue and red updoots and downdoots
                    var votedata = {
                        isUpvoted: false,
                        isDownvoted: false
                    }
                    if(req.user){
                        if(req.user.upvotedPosts.includes(post._id)){
                            votedata.isUpvoted = true;
                        }
                        else if(req.user.downvotedPosts.includes(post._id)){
                            votedata.isDownvoted = true;
                        }
                    }
                    Object.assign(post, votedata);
                }   
                // Reverses Posts array to show newer posts first
                res_posts.reverse();
                res.render("profile", {userinfo: userinfo, posts: res_posts, username: req.user.username});
            })
        })

        function addComment(commentid){
            return new Promise((resolve, reject)=>{
                db.findOne(Comment, {_id: commentid}, null, function(res_comment){
                    resolve(res_comment) 
                })
            })
        }

        /*function user(){
            return new Promise((resolve, reject) =>{
                try{
                    var user;
                    try{
                        user = req.user.username;
                    } catch(e){
                        console.error(e);
                    }

                    if(!user) {
                        console.log("No logged in users detected");
                        resolve(null)
                    }
                    db.findOne(User, {username: user}, {}, function(data){
                        resolve(data)
                    }) 
                }  
                catch(e){
                    console.error(e);
                }
            })
        }*/
    }

}

export default profileController;
