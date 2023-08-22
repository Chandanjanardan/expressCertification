const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Used for parsing JSON requests
app.use(express.json());

// Read tours data from JSON file (ensure the path is correct)
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// GET all tours
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

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

// Create a new tour document and save it
const testTour = new Tour({
  name: "The Pune Hike",
  rating: 4.7,
  price: 50000,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => console.log("Error in model", err));

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/one", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected successfully");
    // Start the server after the database connection is established
    app.listen(4000, () => {
      console.log("Listening on port 4000....");
    });
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });
