const jwt = require ("jsonwebtoken")
require("dotenv").config()
const User = require("./../models/user.model")

const secretkey = process.env.JWT_SECRET
console.log("this is secret",secretkey)

const signup= async(req,res,next)=>{
    try {
        const {name,email,photo,role,password,paswordConfirm,_id,}=req.body
        console.log(name,email,paswordConfirm)

        
        
        const token =jwt.sign({name,email,password,role},secretkey,{
          expiresIn:"90d"
        })
        // console.log(token)
      const userObj= new User({
      
          name,email,photo,role,password,paswordConfirm
      })
      
          const data = await userObj.save()
      
          res.status(200).json({
              status:"success",
              token:token,
              data:{
                  user:data
              }
          })
    } catch (error) {
        res.status(400).json({
            msg:`error in adding user ${error}`
        })
        
    }
}

const login= async(req,res,next)=>{
    try {
        
        const {email,password,token} = req.body
        // if email and password is exist
        if(!email || !password){
          return  res.status(404).json({
                status:"404",
                msg:"Please enter email and password"
    
            })
            // check if user is exixtr &password is correct
            
        } 
        const user=await User.findOne({email:email})
       
        if(!user || !(await user.correctPassword(password, user.password))){
            return res.status(401).json({
                msg:`email and password is incorrect`
            })
        }
        console.log(user,"this is user after login")
        // if everything is correct send token
    } catch (error) {
        res.status(400).json({
            msg:`error from singin ${error}`
        })
        
    }
}
const protect =async (req,res,next)=>{
    try {
        let token ;
        // getting token and check its exist
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token=req.headers.authorization.split(" ")[1]
        }
        
        if(!token){
            return next(("please verify yourself"))
        }
        // validate token
        const decode = await jwt.verify(token,secretkey)
        console.log(decode, "this is jwt decode")
        
        // check is user still exists
        // const freshUser = await User.find(decode.email)
        // if(!freshUser){
        //     return next(("User no longer exist"))
        // }
        next()
        // chek if uer changed password token
        
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
          msg: "Internal Server Error",
        
    })
}}
const restrictTo =(...roles)=>{
    return async (req,res,next)=>{
        let token ;
        // getting token and check its exist
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token=req.headers.authorization.split(" ")[1]
        }
        
        if(!token){
            return next(("please verify yourself"))
        }
        // validate token
        const decode = await jwt.verify(token,secretkey)
        console.log(decode, "this is jwt decode")
        if(!decode.role==="amdin"){
        return next("forbidden")}
    }
    next()
}
  

module.exports={protect,login,signup,restrictTo}