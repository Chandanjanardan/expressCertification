const mongoose = require("mongoose")

// Define the Tour schema
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    rating: {
      type: Number,
      required: [true, "A tour must have a rating"],
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
  });
  
  // Create the Tour model
  const Tour = mongoose.model("Tour", tourSchema);
  


module.exports=Tour