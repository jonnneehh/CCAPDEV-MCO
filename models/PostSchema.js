import mongoose from 'mongoose';

/* postid: unique id of post
 * postOwner: userid of post owner
 * upvotes: array of userids who upvoted the post
 * downvotes: array of userids who downvoted the post
 * comment: array of comment ids
 * caption: caption of a post
 * photo: filename of the photo on the post
 */
const PostSchema = new mongoose.Schema({
    postid: Number,
    postOwner: Number, 
    upvotes: [Number], 
    downvotes: [Number],
    comment: [Number], 
    caption: String,
    photo: String //Filename
})