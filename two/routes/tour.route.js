const express=require("express")
const userRouter = express.Router()
const {addTour,getAllTour,getTour,updateTour,deleteTour}= require("../controller/tour.controller")
const {protect,signup,login} = require("../authController.js/authController")



userRouter.post("/signup",signup)
userRouter.post("/login",login)

userRouter.post("/",addTour)
userRouter.get("/",protect,getAllTour)
userRouter.get("/:id",getTour)
userRouter.patch("/:id",updateTour)
userRouter.delete("/:id",deleteTour)




module.exports=userRouter