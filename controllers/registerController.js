import db from '../models/db.js';
import User from '../models/UserSchema.js';

const registerController = {
    getRegister : function(req, res){
        res.render('register');
    },

    addUser : function(req, res){
        var user = {
            username: req.query.username,
            email: req.query.email,
            password: req.query.password,
            posts: [], 
            followers: [], 
            following: [], 
        }

        db.insertOne(User, user, (result)=>{
            console.log(result);
        })
    },

    findUser : function(req, res){
        db.findOne(User, {username: req.query.username}, {}, (result)=>{
            if(result) res.send(true);
            else res.send(false);
        })
    }
}

export default registerController;
