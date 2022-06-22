import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentsSchema.js";

const profileController = {
    
    getUserProfile: function (req, res) {
        db.findOne(User, {username: req.params.username}, {}, function (userinfo) {
            db.findManyToJSON(Post, {poster: req.params.username}, {}, async function (postinfo) {
                for(let post of postinfo){
                    var commentsdata = [];
                    for(let commentid of post.comments){
                        let c = await addComment(commentid);
                        commentsdata.push(c);
                    }
                    post.comments = commentsdata;
                }

                postinfo.reverse();
                res.render("profile", {userinfo: userinfo, posts: postinfo});
            })
        })

        function addComment(commentid){
            return new Promise((resolve, reject)=>{
                db.findOne(Comment, {_id: commentid}, null, function(res_comment){
                    resolve(res_comment) 
                })
            })
        }
    }

}

export default profileController;
