const groupRouter = require('express').Router()
const Group = require('../model/Group')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const getToken=(req)=>{
    const token = req.get('authorization')
    if(token && token.toLowerCase.startsWith('bearer')){
        return token.substring(7)
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
    const roomId= uuidv4();
    const group = new Group({
        name:body.groupNameInput,
        date:new Date(),
        roomId: roomId,
        location: body.groupLocationInput,
        budget: body.groupBudgetInput,
        creatorId:decodedToken.id,
        participants: [decodedToken.id]
    })
    await group.save()
    return res.status(200).send({message:"Group made",group:group})
})
module.exports = groupRouter