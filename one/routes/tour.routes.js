const express=require("express")
const userRouter = express.Router()

const {getAllTour,addTour,getTour,updateTour,deleteTour} = require ("../controller/tour.controller")


userRouter.get("/",getAllTour)
userRouter.post("/",addTour)
userRouter.get("/:id",getTour)
userRouter.get("/byname",tourByName)
userRouter.patch("/:id",updateTour)
userRouter.delete("/:id",deleteTour)


module.exports= userRouter