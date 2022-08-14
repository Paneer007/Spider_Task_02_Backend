const groupRouter = require('express').Router()
const Group = require('../model/Group')
const User = require("../model/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
//TODO: fix join group
const getToken=(req)=>{
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }else{
        return false
    }
}
groupRouter.post("/",async(req,res)=>{ 
    const token = getToken(req)
    if(!token){
        return res.status(400).send({message:"send a valid token"})
    }
    const body = req.body
    const decodedToken = jwt.decode(token,process.env.secret)
    if(!decodedToken){
        return res.status(400).send({message:"Enter a valid token"})
    }
    const saltRound = 10
    const passHash = await bcrypt.hash(body.groupPasswordInput, saltRound)
    const roomId= uuidv4();
    const group = new Group({
        password: passHash,
        name:body.groupNameInput,
        date:new Date(),
        roomId: roomId,
        location: body.groupLocationInput,
        budget: body.groupBudgetInput,
        creatorId:decodedToken.id,
        participants: [{Details:decodedToken.id,date: new Date()}]
    })
    await group.save()
    const user = await User.findById(decodedToken.id)
    user.groups = [...user.groups, group._id]
    user.save()
    return res.status(200).send({message:"Group made",group:group,user:user})
})
groupRouter.post("/joingroup",async(req,res)=>{
    const token = getToken(req)
    if(!token){
        return res.status(400).send({message:"send a valid token"})
    }
    const body = req.body
    const decodedToken = jwt.decode(token,process.env.secret)
    if(!decodedToken){
        return res.status(400).send({message:"Enter a valid token"})
    }
    const group = await Group.findOne({roomId:body.roomID})
    const user = await User.findById(decodedToken.id)
    if(group.participants.includes(user._id)){
        return res.status(400).send({message:"User already member of the group"})
    }
    user.groups=[...user.groups,group._id]
    group.participants=[...group.participants,user._id]
    await user.save()
    await group.save()
    return res.status(200).send({message:"user added to the room and group updated"})
})
groupRouter.get("/:id",async(req,res)=>{
    const token = getToken(req)
    if(!token){
        return res.status(400).send({message:"send a valid token"})
    }
    const decodedToken = jwt.decode(token,process.env.secret)
    if(!decodedToken){
        return res.status(400).send({message:"Enter a valid token"})
    }
    const searchId = req.params.id
    const group = await Group.findById(searchId).populate('participants.Details')
    console.log(group)
    return res.status(200).send(group)
})
module.exports = groupRouter