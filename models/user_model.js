const mongoose =require("mongoose")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const user_model=mongoose.model("user_model",userSchema)
module.exports=user_model;