// const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const tourRouter=require ("./routes/tour.route")
app.use(express.json());



app.use("/api/v1",tourRouter)


mongoose
  .connect("mongodb://127.0.0.1:27017/two", {
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