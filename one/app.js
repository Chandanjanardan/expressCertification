const fs = require("fs")
const express = require ("express")
const app = express() 
const mongoose = require ("mongoose")

// used for post json req
app.use(express.json())

// app.get("/",(req ,res)=>{
//     res.status(200).json({message:"Hello server"})
// })
const tours =JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// console.log(tours)
app.get("/api/v1/tours",(req,res)=>{
    res.status(200).json({
        status:"success",
        result:tours.length,
        data:{
            tours:tours
        }
    })
})

// post 
app.post("/api/v1/tours",(req,res)=>{
    // console.log(req.body)
    const newId=tours[tours.length-1].id+1
    const newTour=Object.assign({id:newId},req.body)

    tours.push(newTour);
    // push to the file
    // write file not sync
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err =>{
res.status(201).json({
    status:"success",
    data:{
        
        tours:newTour
    }
})
    })
    
})

// making modal
const tourSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        require:[true,"A tour must have a name"],
        unique:true
    },
    rating:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:[true, "A tour must have price"]
    }
});
const Tour = new mongoose.model("tour",tourSchema)
try {
   mongoose.connect("mongodb://127.0.0.1:27017/one")
   .then(()=>console.log("DB Connected successfully"))
   
    
    
    app.listen(4000,()=>{
        console.log(`Listning on port 4000....`)
    })
} catch (error) {
    console.log("Connection error")
}