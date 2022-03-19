const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config({path:"../config/config.env"})
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please Enter your Username"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:[true, "Email already Exists"]
    },
    password:{
        type:String,
        required:[true,"Please Enter password"],
        minlength:[6,"Enter 6 digits password"],
        select:false
    }
})

//hash the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

//match login password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compareSync(password, this.password);
}

//generate token
userSchema.methods.generateToken =  function(){
    return jwt.sign({
        id:this._id,
        email:this.email,
        name:this.name,
        password:this.password
    }, process.env.JWT_SECRET, {expiresIn: '1h'} );
}

module.exports = mongoose.model("Users", userSchema);