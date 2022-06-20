import db from '../models/db.js';
import User from '../models/UserSchema.js';
import passport from 'passport';

const loginController = {
    getLogin: function(req, res){
        res.render('login');
    },
    
    loginUser: function(req, res, next){
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
    },

    logoutUser: function (req, res, next) {
        req.logout(function (err) {
            if (err)
                return next(err);
            else
                req.flash("success_msg", "You are now logged out.");
                res.redirect("/login");
        });
    }
    
};

export default loginController;

/*loginUser : function(req, res){
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    db.findOne(User, user, {}, (result)=>{
        if(result) res.send(true);
        else res.send(false);
    })  
}*/
