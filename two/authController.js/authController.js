const jwt = require ("jsonwebtoken")
require("dotenv").config()
const User = require("./../models/user.model")

const secretkey = process.env.JWT_SECRET
console.log("this is secret",secretkey)

const signup= async(req,res,next)=>{
    try {
        const {name,email,photo,password,paswordConfirm,_id}=req.body
        console.log(name,email,paswordConfirm)

        
        
        const token =jwt.sign({name,email,password,_id},secretkey,{
          expiresIn:"10d"
        })
        // console.log(token)
      const userObj= new User({
      
          name,email,photo,password,paswordConfirm
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
        
        const {email,password} = req.body
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
        const decode = jwt.verify(token,secretkey)
        console.log(decode, "this is jwt decode")
         return next()

        // check is user still exists
        // chek if uer changed password token
        
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({
          msg: "Internal Server Error",
        
    })
}}

module.exports={protect,login,signup}