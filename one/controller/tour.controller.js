const Tour = require("../models/tour.models");

const getAllTour = async (req, res) => {
    const allTour= await Tour.find({})
  res.status(200).json({
    status:"success",
    results:allTour.length,
    tours:{
        tours:allTour
    }
  });
};
const getTour= async(req,res)=>{
    try {
        const tour= await Tour.findById(req.params.id)
        res.status(200).json({
            status:"success",
            data:{
                tour
            }
        })
        
    } catch (error) {
        res.status(400).json({
            msg:"some thing is wrong in id"
        })
        console.log("error from getTourby id",error)
    }
}

// get tour by name
 

const addTour = async (req, res) => {
  try {
    const { name, rating, price } = req.body;
    const tourObj = new Tour({
      name: name,
      rating: rating,
      price: price,
    });
    const addedTour = await tourObj.save();
    console.log(addedTour);
    res.status(201).json({
      tourAdded: addedTour,
    });
  } catch (error) {
    console.log("error in addTour catch", error);
    res.status(500).json({
      error: "Error adding tour",
    });
  }
  
};


const updateTour = async(req,res)=>{
    try {
        const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runvalidator:true
        })
        res.status(200).json({
            status:"success",
            data:{
                tour
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:"error from update by id"
        })
        
    }
}

const deleteTour = async (req,res)=>{

    try {
        
        const tour = await Tour.findByIdAndDelete(req.params.id)
        // if set status to 204 no response visible res visible after delete
        res.status(200).json({
            status:"Deleted",
            tour:{
                msg:`${tour} is deleted`
            }
        })
    } catch (error) {
        console.log("error from deleeTour",error)
        res.status(400).json({
            msg:`Error form deleted Tour ${error}`
        })
        
    }
}

module.exports = { getAllTour, addTour,getTour,updateTour ,deleteTour};
