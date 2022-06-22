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
    posts: {
        type: [Number],
        default: []
    }, 
    followers: {
        type: [Number],
        default: []
    }, 
    following: {
        type: [Number],
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    },
    upvotedPosts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    downvotedPosts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    upvotedComments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    downvotedComments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    }
})

const User = mongoose.model('User', UserSchema);

export default User;
