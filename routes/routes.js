const express=require('express')
const router=express.Router()
require('../db/conn')
const RegUser=require('../model/userSchema')
var bcrypt = require('bcryptjs');
const validateToken=require('../model/JWTAuth');



router.get("/",async(req,res)=>{

})


router.post('/register',async(req,res)=>{
    const {name,email,phone,password}=req.body;
    if(!name || !email || !phone || !password){
        res.status(400).send('All fields are mandatory');
    }
    console.log(req.body);
    try{
        const userExist=await  RegUser.findOne({email:email});
        if (userExist){
            return res.status(402).json({error:"user already exists"});
        }       
        
        const newUser=new RegUser({name,email,phone,password});
        await newUser.save();
        console.log("user registered successfully");
        res.status(200).send("successfully registered");
        
        }catch{(err)=>{
        res.status(400).send(err);
    }}
   
})



router.post('/login',async (req,res)=>{
    const{email,password}=req.body;
    if(!email  || !password){
        return res.status(402).json({error:"please fill all data"});
    }
    try {
        const userLogin=await RegUser.findOne({email:email});
       

        if(!userLogin){
            return res.status(402).json({error:"user not found"});
        }
        
        const isMatch= await bcrypt.compare(password,userLogin.password);
        
        
        
        if(!isMatch){
            
            return res.status(402).json({error:"Invalid Credentials"});
        }
        else{
            token=await userLogin.generateAuthToken();
        // console.log(token);
            res.cookie("jwtoken",token,{
            expires: new Date(Date.now()+25892000000),
            httpOnly:true
        });
            res.status(200).send("user Signin Successfully");
        }
        
        
    } catch (error) {
        console.log(error);
    }
   
})


app.get('/logout',async(req,res)=>{
    res.clearCookie('');
    res.redirect('/');
})

module.exports=router;