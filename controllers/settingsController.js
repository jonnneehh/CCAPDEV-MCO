import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import bcrypt from "bcrypt";

const settingsController = {
    
    getSettings: function (req, res) {
        res.render("settings");
    },

    changeUsername: function(req, res, next){ 
        let user = {username: req.user.username};
        let newuser = {username: req.body.username};

        if (req.body.username == "") {
            next();
        }
        else {
            db.findOne(User, newuser, {}, function (result) {
                if (!result) {
                    if (req.body.username != "") {
                        db.updateOne(User, user, newuser, function(result2){
                            db.findMany(Post, {poster: req.user.username}, {}, function () {
                                if (result2) {
                                    db.updateMany(Post, {poster: req.user.username}, {poster: req.body.username}, function () {
                                        req.flash("success_msg", "Username successfully changed");
                                        res.redirect("/settings");
                                    })
                                }
                            })
                        })
                    }
                }
                else {
                    req.flash("error", "Username entered was taken")
                    res.redirect("/settings");
                }
            }) 
        }   
    },

    changePassword: function (req, res, next) {
        let currentPw = req.body.password;
        let newPw = req.body.newpword;
        let confirm_newPw = req.body.cnewpword;

        if (currentPw == "" && newPw == "" && confirm_newPw == "") {
            next();
        }
        else {
            if (!currentPw || !newPw || !confirm_newPw) {
                req.flash("error", "All password fields must be filled to change password.");
                res.redirect("/settings");
            }
    
            if (newPw !== confirm_newPw) {
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
            if(result) res.send(true);
            else res.send(false);
        })
    },

    changePhoto: async function (req, res) {
        let user = {username: req.user.username};
        let photo = {profilephoto: req.file.filename};

        db.updateOne(User, user, photo, function (result) {
            console.log(result);
            res.redirect("/settings");
        })

    }

    

    /*checkPassword: function(req, res){
        const user = {username: req.user.username};
        const pword = {password: req.query.password};

        const finduser = Object.assign(user, pword);
        console.log(finduser);

        db.findOne(User, finduser, {}, function(result){
            if(result) res.send(true);
            else res.send(false);
        })
    }*/
    
}

export default settingsController;
