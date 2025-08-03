const bcrypt = require("bcrypt");
const user_model=require("../models/user_model")
const post_model=require("../models/post_model")
require("dotenv").config();
const jwt=require("jsonwebtoken")


module.exports.user_register=async(req,res)=>{
    try{
        const {name,email,password,bio,}=req.body

         if (!name || !email || !password || !bio) {
      return res.status(401).json({message:"All fields are required"});
    }
    

    const existingUser = await user_model.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

  
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const user = new user_model({
      name,
      email,
      password: hashedPassword,
      bio
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  }catch(err){
    console.error("User Registration Error", err);
    res.status(500).json({message:"Server Error"});

  }


}

module.exports.user_login=async(req,res)=>{
    const { email, password } = req.body;

  try {
    const user = await user_model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "please Register" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });

    res.status(200).json({
      token,
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     bio: user.bio
    //   }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.user_profile=async(req,res)=>{
     try {
    const user_profile = await user_model.findById(req.user.id).select("-password");
    res.status(200).json(user_profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.user_post=async(req,res)=>{
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty" });
    }

    const post = new post_model({
      content,
      author: req.user.id // comes from decoded token in middleware
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.all_posts=async(req,res)=>{
  try{
     const all_posts = await post_model.find().populate("author", "name email");
    res.status(200).json(all_posts)

  }catch(err){
     res.status(500).json({ message: err.message });

  }
}