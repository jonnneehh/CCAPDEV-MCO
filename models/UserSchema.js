import mongoose from 'mongoose';

/* name: username
 * userid: uniquei id of user
 * posts: array of postids of the user
 * followers: array of userids who follow the user
 * following: array of userids who the user follows
 * bio: string shown when checking profile
 * profilephoto: filename of their profile photo
 */

const UserSchema = new mongoose.Schema({
    name: String,
    userid: Number,
    posts: [Number], 
    followers: [Number], 
    following: [Number], 
    bio: String,
    profilephoto: String 
})