const joy =require('@hapi/joi')

const schema = {
    user:joy.object({
        firstName:joy.string().min(3).required(),
        lastName:joy.string().min(3).required(),
        email:joy.string().email().required(),
        password:joy.string().min(8).pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).message("invalid password").required(),
        phone:joy.string().min(10).max(10).required(),
        type:joy.string().min(3).valid('user','admin').required(),
        DOB:joy.date().iso().required(),
        gender:joy.string().valid('male','female','other').required()
    }),
    password:joy.object({
        password:joy.string().min(8).pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).message("invalid password").required(),
        usrId:joy.string()
    }),
    email:joy.object({
        email:joy.string().email().required()
    }),
    login:joy.object({
        password:joy.string().min(8).pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).message("invalid password").required(),
        email:joy.string().email().required()
    }),
}

module.exports={
    usersValidation: async (req,res,next)=>{
        const validate = await schema.user.validate(req.body)
        if(validate.error)
        {
            res.send({error:validate.error})
        }
        else
        next()
    },
    passwordValidation:async (req,res,next)=>{
        const validate = await schema.password.validate(req.body)
        if(validate.error)
        {
            res.send({error:validate.error})
        }
        else
        next()
    },
    emailValidation:async (req,res,next)=>{
        const validate = await schema.email.validate(req.body)
        if(validate.error)
        {
            res.send({error:validate.error})
        }
        else
        next()
    },
    loginValidation:async (req,res,next)=>{
        const loginValidate = await schema.login.validate(req.body)
        
        if(loginValidate.error)
        {
            res.send({error:passwordValidate})
        }
        else
        next()
    },
}