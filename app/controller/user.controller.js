require('dotenv').config()
const userModel =require('../model/user.model')
const {getToken,sendMail} = require('./customFunction')
const { genSaltSync,hashSync,compareSync} = require('bcrypt')
const {sign} = require('jsonwebtoken')
const nodemailer =require('nodemailer')
const envData = process.env


module.exports={
    active:(req,res)=>{
       userModel.active(req.body,(err,result)=>{
        if(err){
            return res.send({message:"update error"})
        }

        const acessToken =getToken(envData.acessToken,req.usrId,"30m") 
            const refreshToken =getToken(envData.refreshToken,req.usrId,"30d") 
            return res.status(200).send({message:"sucessfully login",
        token:{
            acess:acessToken,
            refreshToken:refreshToken
        }})
    
       })
    },
    getall:(req,res)=>{
        
        userModel.getAll((err,result)=>{
            if(err){
                return res.send({message:"error"})
            }
           
            return res.send({message:"sucess",
        data:result})
        })
    },
    getallById:(req,res)=>{
        const id = req.params.id
        userModel.getAllById(id,(err,result)=>{
            if(err){
                return res.send({message:"error"})
            }
            return res.send({message:"sucess",
            data:result})
        })
    },
   create:(req,res)=>{
       var userId =""
       var idPrefix = "USER"
       userModel.getLastUserId((idErr,idResult)=>{
           if(idErr){
            return res.send({message:"error in getting last user ID"})
           }
           if(idResult == "data was empty"){
              userId = idPrefix+"000001"
           }
           else{
           
           
           var prefixLast=idPrefix.slice(-1)
           console.log(prefixLast)
           console.log(idResult.usrId)
           var id =idResult.usrId.split(prefixLast)[1]
           console.log(id)
           id = Number(id)
           console.log(id)
           id = ++id
           console.log(id)
           
          if(id < 10) id = "00000"+id
          else
          if(id < 100) id = "0000"+id
          else
          if(id < 1000) id = "000"+id
          else
          if(id < 10000) id = "00"+id
          else
          if(id < 100000) id = "0"+id
          else if(id == 1000000)
          {
            return res.send({message:"user limit reached"})
          }
          userId = idPrefix+id 
           }
          
           req.body["usrId"] = userId
           
           const data = req.body
            console.log(data)
           const salt = genSaltSync(10)
        data.password = hashSync(data.password,salt)
        console.log("password",data.password)
        userModel.create(data,(err,result)=>{
            if(err){
                return res.send({message:"error"})
            }
            const acessToken =getToken(envData.activeAccountToken,data.usrId,"30m") 
            const sendData={
                email:data.email,
                subject:"Create Active Your Account",
                html: `please click here <br/> ${acessToken}`
            }
            sendMail(sendData)
            return res.status(200).send({message:"sucess",
            data:data})
        })
       })
        
        
    },
    deleteById:(req,res)=>{
        const id = req.params.id;
        userModel.deleteByID(id,(err,result)=>{
            if(err){
                return res.status(400).send({message:"error"})
            }
            return res.status(202).send({message:"sucess",
            })
        })

    },
    logout:(req,res)=>{
        console.log(req.body.usrId)
        const token =getToken(envData.acessToken,req.body.usrId,"10s") 
        if(req.headers.authorization == token)
        return res.status(200).send({message:"sucessfully login",
    })
    else
    return res.status(200).send({message:token,
})
    }
        

    ,
    login:(req,res)=>{
        userModel.login(req.body,(err,result)=>{
            if(err){
                return res.status(400).send({message:"invalid user"})
            }
           
            console.log(req.body.password+" "+result.password)
        const isCorrectPassword=compareSync(req.body.password,result.password)
        if(isCorrectPassword){
            result.password = undefined
            console.log(envData.acessToken +" " +envData.refreshToken)

            const acessToken =getToken(envData.acessToken,result.usrId,"30m") 
            const refreshToken =getToken(envData.refreshToken,result.usrId,"30d") 
            return res.status(200).send({message:"sucessfully login",
        token:{
            acess:acessToken,
            refreshToken:refreshToken
        }})
        }
        else{
            return res.status(400).send({message:"invalid user"})
        }
        })
    },
    checkUser:(req,res)=>{
          userModel.checkUser(req.body,(err,result)=>{
            if(err){
                return res.status(400).send({message:"error"})
            }
            const token = getToken(envData.resetToken,result.usrId,"30m") 
            const sendData={
                email:req.body.email,
                subject:"Create Active Your Account",
                html: `please click here <br/> ${token}`
            }
            sendMail(sendData)
            return res.status(200).send({message:"sucessfully",token:token})
          })
    },
    reset:(req,res)=>{
        const data = req.body
            console.log(data)
           const salt = genSaltSync(10)
        data.password = hashSync(data.password,salt)
     
                userModel.updateById(req.body.usrId,data,(updateErr,updateResult)=>{
                    if(updateErr){
                        return res.send({message:"update error"})
                    }
                    return res.send({message:"sucess",
                    })
                })
            },
            getAcessToken:(req,res)=>{
                console.log(req.body.usrId)
                if(req.body.usrId){

                
                const token =getToken(envData.acessToken,req.body.usrId,"30m") 
                
                return res.status(200).send({message:token,
            })
        }
            else
            return res.status(200).send({message:"error",
        })
            }
           
            
           
        
    }

