const express=require("express")
const router=express.Router()
const {user_register,user_login,user_profile,user_post,all_posts,user_posts}=require("../controllers/userLogic")

const middleware=require("../middleware/middleware")

router.post("/register",user_register)
router.post("/login",user_login)
router.post("/post",middleware,user_post)
router.get("/profile",middleware,user_profile)
router.get("/allposts",middleware,all_posts)
router.get("/:userId",middleware,user_posts)

module.exports=router;
