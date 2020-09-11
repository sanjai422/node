const userModel=require('../model/user.model')

module.exports = {
    user : (req,res,next)=>{
       userModel.dublicateUser(req.body,(err,result)=>{
           if(err)
           return req.send({message:"error in database"});
           var email = result.filter(function(item){
               return req.body.email == item.email
           })
           var phone = result.filter(function(item){
            return req.body.phone == item.phone
        })
        var responseData = ''
        if(email.length >0)responseData="your email id already used please use another one"
        if(phone.length >0){
            if(email.length >0)
            responseData="your email id and phone number was already used please use another one"
            else
            responseData="your phone number already used please use another one"
        }
        if(email.length==0&&phone.length==0)
        next()
        else
        res.send({message:responseData})
       })
    }
}