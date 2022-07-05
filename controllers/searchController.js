import db from "../models/db.js";
import User from "../models/UserSchema.js";

const searchController = {
    searchUser: function(req, res){
        db.findOne(User, {username: req.query.username}, {}, (result)=>{
            if(result) res.send(true);
            else res.send(false);
        })
    }
}

export default searchController;