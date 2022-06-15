// const { verify } = require('jsonwebtoken');
const jwt=require('jsonwebtoken')
const RegUser=require('./userSchema')
var cookies = require("cookie-parser");


const validateToken=async (req,res,next)=>{
    const accessToken=req.cookies.jwt;
    if(!accessToken){
        return res.status(400).jason({error:"User not autheticated"});
    }
    try {
        const validToken=jwt.verify(accessToken,"shannagaritsralllyhothere");
        if(validToken){
            req.authenticated=true;
            const user=await RegUser.findOne({_id:validToken._id});
            console.log(user);
            return next();
        }
    } catch (error) {
        console.log("Authetication error");
    }
}


module.exports=validateToken;