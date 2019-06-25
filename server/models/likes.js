const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
    amountOfLikes: {
        type: Number
    }
}, {timestamps: true});

mongoose.model("Likes", LikesSchema);

module.exports = LikesSchema;