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

module.exports = { getAllTour, addTour,getTour,updateTour };
