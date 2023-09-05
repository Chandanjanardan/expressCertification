const express=require("express")
const userRouter = express.Router()
const {addTour,getAllTour}= require("../controller/tour.controller")

userRouter.post("/",addTour)
userRouter.get("/",getAllTour)




module.exports=userRouter