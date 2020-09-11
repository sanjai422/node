require('dotenv').config()
const {sign} = require('jsonwebtoken')
const nodemailer =require('nodemailer')

const envData=process.env
module.exports = {
    getToken : (secretCode,data,time)=>{
        const token = sign({id:data},secretCode,{expiresIn:time}) 
        return token
    },
    sendMail:(data)=>{
        console.log(envData.email)
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:envData.email,
                pass:envData.password
            }
        })
    
        let mailData = {
            from:envData.email,
            to:data.email,
            subject:data.subject,
            html: data.html
        }
    
        transporter.sendMail(mailData,(err,data)=>{
            if(err){
                console.log("error",err)
            }
            else
            console.log("sucess")
        })
    }
   
}