import mongoose from 'mongoose';

const CommentsSchema = new mongoose.Schema({
    commentOwner: {
        type: String,
        required: true
    },
    commentOwnerDP: {
        type: String,
        required: true
    },
    postOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: () => Date.now()
    },
    likes: {
        type: Number,
        default: 0
    }
})

const Comment = mongoose.model("Comment", CommentsSchema);

export default Comment;