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
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilephoto: {
        type: String,
        default: "placeholder.jpg"
    },
    bio: {
        type: String,
        default: "Welcome to my profile!"
    },
    posts: [Number], 
    followers: [Number], 
    following: [Number]
})

const User = mongoose.model('User', UserSchema);

export default User;
