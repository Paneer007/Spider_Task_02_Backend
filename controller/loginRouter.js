const loginRouter = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
loginRouter.post('/',async(req,res)=>{
    const body = req.body
    console.log(body)
    if(!(body.password&& body.username)){
        return res.status(400).send({message:"enter valid username and password"})
    }
    let user = await User.findOne({username:body.username})
    if(!user){
        return res.status(400).send({message:"Enter valid username and password"})
    }
    const passConfirm = bcrypt.compare(body.password,user.password)
    if(!passConfirm){
        return res.status(400).send({message:"wrong password pa"})
    }
    const tokenBody ={id:user._id,username:user.username}
    const jwtToken = jwt.sign(tokenBody,process.env.SECRET)
    return res.status(200).send({message:"logged in created",token:jwtToken})
})
module.exports = loginRouter