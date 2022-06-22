import mongoose from "mongoose";
import CommentsSchema from "../models/CommentsSchema.js"

const PostSchema = new mongoose.Schema({
    poster: {
        type: String,
        required: true
    },
    posterDP: {
        type: String,
        default: "placeholder.jpg"
    },
    caption: {
        type: String
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
    },
    comments: [mongoose.SchemaTypes.ObjectId]
})

const Post = mongoose.model("Post", PostSchema);

export default Post;