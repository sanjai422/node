const {verify} = require('jsonwebtoken')
require('dotenv').config()
const envData = process.env
const check=(req,secretCode)=>{
    var token = req.headers.authorization;
    console.log(token)
    if(token){
       return verify(token,secretCode,(err,decoded)=>{
            if(err){
                console.log("token")
                return {error:true}
            }
            else{
                return {error:false,data:decoded.id}
            }
            
            
        })
    }
    else
    return {error:true}
}
module.exports = {
    checkAcessToken : (req,res,next)=>{
        
        try {
          var result =  check(req,envData.acessToken)
              if(result.error)
              {
                res.json({
                    message:"unauthorized user"
                })
              }
              else{
                req.body['usrId']=result.data
                next()
              }
        } catch (error) {
            console.log(error)
        }

        
    },
    checkResetToken : (req,res,next)=>{
        try {
            var result =  check(req,envData.resetToken)
                if(result.error)
                {
                  res.json({
                      message:"unauthorized user"
                  })
                }
                else{
                  req.body['usrId']=result.data
                  next()
                }
          } catch (error) {
              console.log(error)
          }
  
    },
    checkRefreshToken : (req,res,next)=>{
      
        try {
            var result =  check(req,envData.refreshToken)
                if(result.error)
                {
                  res.json({
                      message:"unauthorized user"
                  })
                }
                else{
                  req.body['usrId']=result.data
                  next()
                }
          } catch (error) {
              console.log(error)
          }
        },
        checkActiveAccountToken : (req,res,next)=>{
      
            try {
                var result = check(req,envData.activeAccountToken)
               
                    if(result.error)
                    {
                      res.json({
                          message:"unauthorized user"
                      })
                    }
                    else{
                      req.body['usrId']=result.data
                      next()
                    }
              } catch (error) {
                  console.log(error)
              }
            }
}