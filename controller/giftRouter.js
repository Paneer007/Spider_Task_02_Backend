const giftRouter = require('express').Router()
const Gift = require('../model/Gift')
const jwt = require('jsonwebtoken')
const getToken=(req)=>{
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }else{
        return false
    }
}
giftRouter.post('/:id/update',async(req,res)=>{
    const id = req.params.id
    const token = getToken(req)
    if(!token){
        return res.status(400).send({message:"Enter a valid token"})
    }
    let decodedToken = jwt.decode(token,process.env.SECRET)
    if(!decodedToken){
        return res.status(400).send({message:"Enter a valid token"})
    }
    const body = req.body
    const gift = await Gift.findById(id)
    if(!gift){
        return res.status(400).send({message:"Invalid gift id"})
    }
    gift.name = body.Name
    gift.budget = body.Budget
    await gift.save()
    return res.status(200).send({message:"Gift successfully updated"})
})
module.exports= giftRouter