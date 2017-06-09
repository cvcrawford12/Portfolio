var mongoose = require("mongoose");

// Mongoose schema configuration
var commentSchema = new mongoose.Schema({
    name: String,
    created: {type: Date, default: Date.now},
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);