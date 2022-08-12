const signupRouter = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
signupRouter.post('/',async (req,res)=>{
    const body = req.body
    console.log(body)
    if(!(body.password&& body.username)){
        return res.status(400).send({message:"enter valid username and password"})
    }
    //TODO: Search for username in the server and report error
    let saltRound = 10
    const passwordHash = await bcrypt.hash(body.password,saltRound)
    const user = new User({username:body.username, password: passwordHash})
    await user.save()
    return res.status(200).send({message:"user is created"})
})
module.exports = signupRouter