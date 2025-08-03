const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_model",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000,
  },
}, { timestamps: true });

const post_model=mongoose.model("Post", postSchema);
module.exports = post_model
