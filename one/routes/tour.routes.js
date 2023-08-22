const express=require("express")
const userRouter = express.Router()

const {getAllTour,addTour,getTour,updateTour} = require ("../controller/tour.controller")


userRouter.get("/",getAllTour)
userRouter.post("/",addTour)
userRouter.get("/:id",getTour)
userRouter.patch("/:id",updateTour)


module.exports= userRouter