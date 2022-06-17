import db from '../models/db.js';
import User from '../models/UserSchema.js';

const loginController = {
    getLogin: function(req, res){
        res.render('login');
    },
    
    loginUser : function(req, res){
        var user = {
            username: req.query.username,
            password: req.query.password
        }
        db.findOne(User, user, {}, (result)=>{
            if(result) res.send(true);
            else res.send(false);
        })
    }
}

export default loginController;
