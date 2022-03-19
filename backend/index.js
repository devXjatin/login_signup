const express = require('express');
const app = express();
const connectDB = require('./config/database')
const  cookieParser = require('cookie-parser')
const passport = require('passport')
 require('./config/passport-jwt');

connectDB();


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());

app.use('/', require('./routes'));

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on Port: ${process.env.PORT}`);
})