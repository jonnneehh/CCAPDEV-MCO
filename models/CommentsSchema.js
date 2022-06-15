import mongoose from 'mongoose';

/* commentid: is the unique id of a comment
 * ranking: is how comments will be placed in the post. 0 is first comments, 1 is second, etc.
 * if a comment is deleted the ranking will add 1 from the highest ranked comment. 
 * for example: 0 1 2, comment 1 is deleted, 0 2, new comment is added, 0 2 3.
 * parentPost: the postid of the post the comment is attached to
 * commentOwner: the userid of the commenter
 * upvotes: an array of userids who upvoted the post
 * downvotes: an array of userids who downvoted the post
 */
const CommentsSchema = new mongoose.Schema({
    commentid: Number,
    ranking: Number, 
    parentPost: [Number],
    commentOwner: [Number],
    upvotes: [Number],
    downvotes: [Number]
})