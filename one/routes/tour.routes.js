const express=require("express")
const userRouter = express.Router()

const {getAllTour,addTour,getTour} = require ("../controller/tour.controller")


userRouter.get("/",getAllTour)
userRouter.post("/",addTour)
userRouter.get("/:id",getTour)


module.exports= userRouter