const mongoose=require("mongoose")
var validator = require("email-validator");
const bcrypt = require("bcrypt")

const userSchema= new mongoose.Schema({

name:{
    type:String,
    required   :[true,"Please enter the name"]
},
email:{
    type:String,
    required:[true,"Please provide email"],
    unique:true,
    lowercase:true,
    // validate:[validator.validate,"Please provide a valid email"]
    
},
photo:String,
role:{
    type:String,
    enum:["user","guide","lead-guide","admin"],
    default:"user"
},
password:{
    type:String,
    required:true,
    minlength:8

},
paswordConfirm:{
    type:String,
    required:[true, "Please provide confirm password"],
    // validate return either true
    validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
}
})
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()

    this.password= await bcrypt.hash(this.password,12)
    this.paswordConfirm=undefined
    next()
})
userSchema.methods.correctPassword= async function (candidatePassword,userPassword){
   return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model("User",userSchema)

module.exports=User