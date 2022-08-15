const userdataRouter=  require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const getToken =(req)=>{
    let authorization= req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }else{
        return false
    }
}
userdataRouter.get('/',async (req,res)=>{
    const token = getToken(req)
    if(!token){
        return res.status(400).send({message:"Enter a valid token"})
    }
    let decodedToken = jwt.decode(token,process.env.SECRET)
    if(!decodedToken){
        return res.status(400).send({message:"Enter a valid token"})
    }
    const user = await User.findById(decodedToken.id).populate({
        path: 'toGift',
        populate:{
            path: "to"
        }
    }).populate({
        path: 'toGift',
        populate:{
            path: "group"
        }
    }).populate('groups')
    return res.status(200).send(user)
})
module.exports= userdataRouter
