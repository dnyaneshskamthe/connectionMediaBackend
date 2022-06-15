const mongoose=require('mongoose')
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')



const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{ type:String,required:true,unique:true},
    phone:{type:Number,required:true},
    password:{ type:String,required:true},
    tokens:[
        {
            token:{
                type:String,
                require:true,
            }
        }
    ]

},{
    timestamps:true
})

UserSchema.pre("save",async function(next){
    console.log("hello from pre function");
    if(this.isModified('password')){
        
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
    
});


//generate jwt token

UserSchema.methods.generateAuthToken = async function(){
    try {
        let newToken=jwt.sign({_id:this._id.toString()},'thisisassignmentforconnectionmedia');
        this.tokens=this.tokens.concat({token:newToken});
       await  this.save();
    //    console.log(newToken);
       return newToken;
    } catch (error) {
        console.log(error);
    }
}


module.exports=mongoose.model('RegUser',UserSchema);