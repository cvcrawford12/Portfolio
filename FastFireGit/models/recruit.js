var mongoose = require("mongoose");

var recruitModel = mongoose.Schema ({
    name: String,
    email: String,
    number: Number,
    resume: Buffer
});


module.exports = mongoose.model("Recruit", recruitModel);