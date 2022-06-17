import mongoose from "mongoose";

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
    postlikes: {
        type: Number,
        default: 0
    }

})

const Post = mongoose.model("Post", PostSchema);

export default Post;