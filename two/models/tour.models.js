const mongoose = require("mongoose")

// Define the Tour schema
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    duration:{
      type:Number,
      require:[true,"A tour must have duration"]
    },
    maxGroupSize:{
      type:Number,
      required:[true," A tour must have gorup size"]
    },
    difficulty:{
      type:String,
      required:[true,"A tour should have difficulties"]
    },
    ratingAverage:{
      type:Number,
      default:4.5
    },
    ratingQuantity:{
      type:Number,
      default:0
    },
    rating: {
      type: Number,
      required: [true, "A tour must have a rating"],
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount:{
      type:Number
    },
    summary:{
      type:String,
      trim:true
    },
    description:{
      type:String,
      trim:true
    },imageCover:{
      type:String,
      // required:[true,"A tour must have cover photo"]
    },
    images:[String],
    createdAt:{
      type:Date,
      default:Date.now()
    },
    startDates:[Date]
  });
  
  // Create the Tour model
  const Tour = mongoose.model("Tour", tourSchema);
  


module.exports=Tour