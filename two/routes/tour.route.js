const express=require("express")
const userRouter = express.Router()
const {addTour,getAllTour,getTour,updateTour,deleteTour}= require("../controller/tour.controller")

userRouter.post("/",addTour)
userRouter.get("/",getAllTour)
userRouter.get("/:id",getTour)
userRouter.patch("/:id",updateTour)
userRouter.delete("/:id",deleteTour)




module.exports=userRouter