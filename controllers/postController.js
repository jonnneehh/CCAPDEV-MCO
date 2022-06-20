import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";

const postController = {

    postPost: async function (req, res) {
        console.log(req.file);
        //console.log(req.body);
        let data = {
           poster: req.user.username, //TODO: Change to username of currently logged in user
           caption: req.body.caption,
           content: req.file.filename
           //layout: false
        }
        db.insertOne(Post, data, function (result) {
            console.log(result);
            res.redirect("/");
        })
        

    },

    getPost: function (req, res) {
        res.render("addpost");
    }
}

export default postController;

/*
    let post = new Post({
    poster: "Kevin", // TODO: Change this to username of currently logged in user
    caption: req.body.caption,
    content: req.body.content
});


try {
    post = await post.save();
    res.redirect("/");
    //console.log(post.id);
} catch (err) {
    console.log(err);
} 
*/
