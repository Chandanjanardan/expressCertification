const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter= require("./routes/tour.routes")

// Used for parsing JSON requests
app.use(express.json());

// Read tours data from JSON file (ensure the path is correct)
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.use("/api/v1",userRouter)

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
