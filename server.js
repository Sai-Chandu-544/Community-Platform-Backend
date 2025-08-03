const express =require("express")
const app=express()
const env=require('dotenv').config();
const PORT=process.env.PORT 
// console.log(PORT)

const DB=require("./config/DB_Connection")
const cors = require("cors");
const userRouter=require("./routes/user_router")
DB()
app.use(cors());
app.use(express.json());


app.use("/user",userRouter)

app.listen(PORT,()=>console.log(`server Running on Port ${PORT}`))