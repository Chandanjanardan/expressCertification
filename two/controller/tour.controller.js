const Tour =require("../models/tour.models")

// getallTour
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
// add tour
const addTour = async (req, res) => {
    try {
      const {name, rating, price } = req.body; // Destructure the properties
      console.log(name, rating, price);

      // Create a new Tour object
      const tourObj = new Tour({
        name,
        rating,
        price,
      });

      const addedTour = await tourObj.save();
      console.log(addedTour);

      res.status(201).json({
        tourAdded: addedTour,
      });
    } catch (error) {
      console.log("Error in addTour catch", error);
      res.status(500).json({
        error: "Error adding tour",
      });
    }
};


  

  module.exports={addTour,getAllTour}