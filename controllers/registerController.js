import db from '../models/db.js';
import User from '../models/UserSchema.js';
import bcrypt from "bcrypt";

const registerController = {
    getRegister : function(req, res){
        res.render('register');
    },
    
    addUser : async function (req, res){

        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        let user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }

        db.insertOne(User, user, function (result) {
            //console.log(result);
            if (result) {
                req.flash("success_msg", "Registration successful. You may now login.");
                res.redirect("/login");
            }
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
