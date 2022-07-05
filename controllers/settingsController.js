import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentsSchema.js";
import bcrypt from "bcrypt";
import multer from "multer";
import upload from "../middlewares/upload.js";

const settingsController = {
    
    getSettings: function (req, res) {
        res.render("settings");
    },

    changeUsername: function(req, res, next){ 

        // Check if username is already taken
        db.findOne(User, {username: req.body.username}, {}, function (result) {
            if (!result) {
                // If username field is not taken and not empty, updates username
                if (req.body.username != "") {
                    db.updateOne(User, {username: req.user.username}, {username: req.body.username}, function () {
                        // Check if user has any posts and then update them to match username
                        db.findMany(Post, {poster: req.user.username}, {}, function (result2) {
                            if (result2) {
                                db.updateMany(Post, {poster: req.user.username}, {poster: req.body.username}, function () {
                                    return;
                                })
                            }
                        })
                        // Check if user has any comments and then update them to match username
                        db.findMany(Comment, {commentOwner: req.user.username}, {}, function (result3) {
                            if (result3) {
                                db.updateMany(Comment, {commentOwner: req.user.username}, {commentOwner: req.body.username}, function () {
                                    return;
                                })
                            }
                        })

                        req.flash("success_msg", "Username successfully changed");
                        res.redirect("/settings");
                    })
                }
            }
            else {
                req.flash("error", "Username entered was taken.");
                res.redirect("/settings");
            }
        })
    },

    changePassword: function (req, res) {
        let currentPw = req.body.password;
        let newPw = req.body.newpword;
        let confirm_newPw = req.body.cnewpword;

        if (!currentPw || !newPw || !confirm_newPw) {
            req.flash("error", "All password fields must be filled to change password.");
            res.redirect("/settings");
        }
        else if (newPw !== confirm_newPw) {
            req.flash("error", "New passwords did not match.");
            res.redirect("/settings");
        }
        else {
            User.findOne({username: req.user.username}).then(function (user) {
                bcrypt.compare(currentPw, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(newPw, salt, function (err, hash) {
                                if (err) throw err;
                                user.password = hash;
                                user.save();
                            })
                        });
                        req.flash("success_msg", "Password successfully changed.");
                        res.redirect("/settings");
                    }
                    else {
                        req.flash("error", "Current password did not match.");
                        res.redirect("/settings");
                    }
                })
            })
        }
        
    },

    changeEmail: function(req, res){
        const user = {username: req.user.username};
        const email = {email: req.query.email};

        db.updateOne(User, user, email, function(result){
            if (result) 
                res.send(true);
            else 
                res.send(false);
        })
    },

    changeAbout: function(req, res){
        const user = {username: req.user.username};
        const bio = {bio: req.query.bio};

        db.updateOne(User, user, bio, function(result){
            if (result)
                res.send(true);
            
            else 
                res.send(false);
            
        })
    },

    changePhoto: async function (req, res) {
        let photoUpload = upload.single("profilephoto");

        photoUpload(req, res, function (err) {
            console.log(req.file);

            if (req.file == undefined || req.file.filename == undefined || err || err instanceof multer.MulterError) {
                console.log(err);
                req.flash("error", "Failed to change profile photo. Please select the correct file type and size. (jpg, jpeg, png, and gif. Max size 3mb)");
                res.redirect("/settings");
            }
            else {
                // Updates user's profile pic
                db.updateOne(User, {username: req.user.username}, {profilephoto: req.file.filename}, function () {
                    // Updates user's posts to match updated prof pic
                    db.updateMany(Post, {poster: req.user.username}, {posterDP: req.file.filename}, function () {
                        return;
                    })
                    // Updates user's comments to match updated prof pic
                    db.updateMany(Comment, {commentOwner: req.user.username}, {commentOwnerDP: req.file.filename}, function () {
                        return;
                    })

                    //console.log(result);
                    req.flash("success_msg", "Profile picture successfully changed");
                    res.redirect("/settings");
                })
            }
        })
        

    }
    
}


export default settingsController;
