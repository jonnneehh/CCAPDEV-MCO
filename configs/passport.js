import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcrypt";

import db from "../models/db.js"
import User from "../models/UserSchema.js";
import mongoose from "mongoose";

function passportconfig(passport) {
    passport.use(
        "local",
        new LocalStrategy({ usernameField: "username"}, 
        function (username, password, done) {
            // Find matching usernames
            User.findOne({username: username})
            .then( function (user) {
                if (!user) {
                    return done(null, false, {message: "Username not found."});
                }

                // If username is in database, check if password matches
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) 
                        throw err;

                    if (isMatch) {
                        console.log(user);
                        return done(null, user);
                    }
                        
                    else {
                        return done(null, false, {message: "Password is incorrect"});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    })
}


export default passportconfig;