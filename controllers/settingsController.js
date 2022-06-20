import db from "../models/db.js";
import User from "../models/UserSchema.js";

const settingsController = {
    
    getSettings: function (req, res) {
        res.render("settings");
    },

    changeUsername: function(req, res){
        /* TODO: The username of the logged in user should be checked here
         * and be assigned as a json, {username: ---USERNAME OF LOGGED IN USER---}.
         * By default it is set to "sample".
         */
        const user = {username: "sample"};
        const newuser = {username: req.query.username};

        db.updateOne(User, user, newuser, function(result){
            if(result) res.send(newuser);
            else res.send(false);
        })
    },

    changePassword: function(req, res){
        /* TODO: The username of the logged in user should be checked here
         * and be assigned as a json, {username: ---USERNAME OF LOGGED IN USER---}.
         * By default it is set to "sample".
         */
        const user = {username: "sample"};
        const newpword = {password: req.query.password};

        db.updateOne(User, user, newpword, function(result){
            if(result) res.send(true);
            else res.send(false);
        })
    },

    changeAbout: function(req, res){
        /* TODO: The username of the logged in user should be checked here
         * and be assigned as a json, {username: ---USERNAME OF LOGGED IN USER---}.
         * By default it is set to "sample".
         */
        const user = {username: "sample"};
        const bio = {bio: req.query.bio};

        db.updateOne(User, user, bio, function(result){
            if(result) res.send(true);
            else res.send(false);
        })
    },

    changeEmail: function(req, res){
        /* TODO: The username of the logged in user should be checked here
         * and be assigned as a json, {username: ---USERNAME OF LOGGED IN USER---}.
         * By default it is set to "sample".
         */
        const user = {username: "sample"};
        const email = {email: req.query.email};

        db.updateOne(User, user, email, function(result){
            if(result) res.send(true);
            else res.send(false);
        })
    },

    checkPassword: function(req, res){
        /* TODO: The username of the logged in user should be checked here
         * and be assigned as a json, {username: ---USERNAME OF LOGGED IN USER---}.
         * By default it is set to "sample".
         */
        const user = {username: "sample"};
        const pword = {password: req.query.password};

        const finduser = Object.assign(user, pword);
        console.log(finduser);

        db.findOne(User, finduser, {}, function(result){
            if(result) res.send(true);
            else res.send(false);
        })
    }
}

export default settingsController;
