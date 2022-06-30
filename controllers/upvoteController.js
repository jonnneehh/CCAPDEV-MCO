import db from "../models/db.js";
import User from "../models/UserSchema.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentsSchema.js"

const upvoteController = {
    addUpvote: async function (req, res) {
        var id = req.query._id;
        var username = req.user.username;
        var likes = req.query.likes;

        if (isPost(req.query.isPost)) {
            await add(Post, true, id, username, likes);
        }
        else {
            await add(Comment, true, id, username, likes);
        }
    }, 

    addDownvote: async function (req, res) {
        var id = req.query._id;
        var username = req.user.username;
        var likes = req.query.likes;

        if (isPost(req.query.isPost)) {
            await add(Post, false, id, username, likes);
        }
        else {
            await add(Comment, false, id, username, likes);
        }
    },
    
    removeUpvote: async function (req, res) {
        var id = req.query._id;
        var username = req.user.username;
        var likes = req.query.likes;

        if (isPost(req.query.isPost)) {
            await remove(Post, true, id, username, likes);
        }
        else {
            await remove(Comment, true, id, username, likes);
        }
    },

    removeDownvote: async function (req, res) {
        var id = req.query._id;
        var username = req.user.username;
        var likes = req.query.likes;

        if (isPost(req.query.isPost)) {
            await remove(Post, false, id, username, likes);
        }
        else {
            await remove(Comment, false, id, username, likes);
        }
    }, 
} 

function remove(Model, isUpvote, id, username, likes){
    return new Promise(async function(resolve, reject){
        try{
            if(isUpvote){
                var curr = await getUserModelData(Model, username); 
        
                if(curr.upvoted.includes(id) == true){
                    //Removes the id from upvoted
                    curr.upvoted.pop(id)
        
                    //Put the new upvoted and downvoted model data to prepare to access database
                    var updated;
                    if(Model == Post){
                        updated = {
                            upvotedPosts: curr.upvoted,
                            downvotedPosts: curr.downvoted
                        } 
                    }
                    else if(Model == Comment){
                        updated = {
                            upvotedComments: curr.upvoted,
                            downvotedComments: curr.downvoted
                        }
                    }

                    //Update model data on User's database
                    await updateUserModelData(Model, username, updated);
        
                    //Updates number of likes in the Model database
                    await updateParentStatus(Model, id, likes);
                }
                else{
                    console.log("Never upvoted, cancelling update...")
                }
            }
            else{
                var curr = await getUserModelData(Model, username);
        
                if(curr.downvoted.includes(id) == true){
                    //Removes the id from downvoted
                    curr.downvoted.pop(id)
        
                    //Put the new upvoted and downvoted model data to prepare to access database
                    var updated;
                    if(Model == Post){
                        updated = {
                            upvotedPosts: curr.upvoted,
                            downvotedPosts: curr.downvoted
                        } 
                    }
                    else if(Model == Comment){
                        updated = {
                            upvotedComments: curr.upvoted,
                            downvotedComments: curr.downvoted
                        }
                    }
        
                    //Update model data on User's database
                    await updateUserModelData(Model, username, updated);
        
                    //Updates number of likes in the Model database
                    await updateParentStatus(Model, id, likes);
                }
                else{
                    console.log("Never downvoted, cancelling update...")
                }
            }
            resolve(true);
        }
        catch(e){
            console.error(e);
            reject(false);
        }
    })
}

function add(Model, isUpvote, id, username, likes){
    return new Promise(async function(resolve, reject){
        try{
            if(isUpvote){
                var curr = await getUserModelData(Model, username); 
        
                if(curr.upvoted.includes(id) == false){
                    //Adds the id to upvoted
                    curr.upvoted.push(id)
        
                    //If duplicated model exists, delete it
                    if(curr.downvoted.includes(id)){
                        console.log("Removing duplicate on downvoted model");
                        curr.downvoted.pop(id);
                    }
        
                    //Put the new upvoted and downvoted model data to prepare to access database
                    var updated;
                    if(Model == Post){
                        updated = {
                            upvotedPosts: curr.upvoted,
                            downvotedPosts: curr.downvoted
                        } 
                    }
                    else if(Model == Comment){
                        updated = {
                            upvotedComments: curr.upvoted,
                            downvotedComments: curr.downvoted
                        }
                    }

                    //Update model data on User's database
                    await updateUserModelData(Model, username, updated);
        
                    //Updates number of likes in the Model database
                    await updateParentStatus(Model, id, likes);
                }
                else{
                    console.log("Already upvoted, cancelling update...")
                }
            }
            else{
                var curr = await getUserModelData(Model, username);
        
                if(curr.downvoted.includes(id) == false){
                    //Adds the id to upvoted
                    curr.downvoted.push(id)
        
                    //If duplicated model exists, delete it
                    if(curr.upvoted.includes(id)){
                        console.log("Removing duplicate on upvoted model");
                        curr.upvoted.pop(id);
                    }
        
                    //Put the new upvoted and downvoted model data to prepare to access database
                    var updated;
                    if(Model == Post){
                        updated = {
                            upvotedPosts: curr.upvoted,
                            downvotedPosts: curr.downvoted
                        } 
                    }
                    else if(Model == Comment){
                        updated = {
                            upvotedComments: curr.upvoted,
                            downvotedComments: curr.downvoted
                        }
                    }
        
                    //Update model data on User's database
                    await updateUserModelData(Model, username, updated);
        
                    //Updates number of likes in the Model database
                    await updateParentStatus(Model, id, likes); 
                }
                else{
                    console.log("Already downvoted, cancelling update...")
                }
            }
            resolve(true);
        }
        catch(e){
            console.error(e);
            reject(false);
        }
    })
}

function isPost(isPost) {
    if (isPost == "true") return true;
    else return false;
}

function updateParentStatus(Model, id, likes,) {
    return new Promise((resolve, reject) => {
        db.updateOne(Model, { _id: id }, { likes: likes }, (status) => {
            if (!status) {
                reject(false);
            }
            resolve(true);
        })
    })
}

function getUserModelData(Model, user){
    return new Promise((resolve, reject) => {
        db.findOne(User, {username: user}, {}, (data) => {
            if(!data){
                reject(false)
            }
            var modelData = {}
            if(Model == Post){
                modelData = {
                    downvoted: data.downvotedPosts,
                    upvoted: data.upvotedPosts
                }
            }
            else if(Model == Comment){
                modelData = {
                    downvoted: data.downvotedComments,
                    upvoted: data.upvotedComments
                }
            }
            else{
                console.log("getUserModelPostData: Cannot use Model " + Model)
            }

            resolve(modelData);
        })
    })
}
 
function updateUserModelData(Model, user, newData){
    return new Promise((resolve, reject) => {
        db.updateOne(User, {username: user}, newData, (status)=>{
            if(status){
                console.log("Updated user model data");
                resolve(true);
            }  
            else{
                console.log("Error: Cannot update user model");
                reject(false);  
            }
        }) 
    })
}

export default upvoteController;