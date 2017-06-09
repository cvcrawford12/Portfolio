var mongoose = require("mongoose");


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    location: String,
    likes: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {type: Date, default: Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


// Mongoose model configuration
var Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;