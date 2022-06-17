import mongoose from 'mongoose';

/* username: UNIQUE username 
 * posts: array of postids of the user
 * followers: array of userids who follow the user
 * following: array of userids who the user follows
 * bio: string shown when checking profile
 * profilephoto: filename of their profile photo
 * email: email of the user. validity is checked upon registering
 * password: String of the user's password to login to site
 */

const UserSchema = new mongoose.Schema({
    username: String,
    posts: [Number], 
    followers: [Number], 
    following: [Number], 
    bio: String,
    profilephoto: String,
    email: String,
    password: String
})

const User = mongoose.model('User', UserSchema);

export default User;