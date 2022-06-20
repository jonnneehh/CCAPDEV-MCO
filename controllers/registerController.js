import db from '../models/db.js';
import User from '../models/UserSchema.js';

const registerController = {
    getRegister : function(req, res){
        res.render('register');
    },
    
    addUser : async function (req, res){
        let user = {
            username: req.body.user,
            email: req.body.email,
            password: req.body.pword
        }

        db.insertOne(User, user, function (result) {
            //console.log(result);
            if (result) {
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
