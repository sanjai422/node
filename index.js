require('dotenv').config()
const express = require('express');
const app = express();

const data = process.env
const bodyParser = require("body-parser");
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const userRouter =require('./app/router/user.router')
app.use('/api/users/',userRouter)


app.listen(2000,()=>{
    console.log("server running " + data.port)
})
app.post('',(req,res)=>{
    if(req.body){
        res.send({message:"hjgjgj"})
    }
    else{
        res.send({message:"error"})
    }
    
})