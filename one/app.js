const fs = require("fs")
const express = require ("express")
const app = express() 

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
app.listen(4000,()=>{
    console.log(`Listning on port 4000....`)
})