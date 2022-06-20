import db from '../models/db.js';
import User from '../models/UserSchema.js';
import passport from 'passport';

const loginController = {
    getLogin: function(req, res){
        res.render('login');
    },
    
    loginUser : function(req, res, next){
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
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
