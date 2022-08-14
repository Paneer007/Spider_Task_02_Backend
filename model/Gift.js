const mongoose = require('mongoose')
const giftSchema = mongoose.Schema({
    to:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    name: String,
    budget:Number,
    group:{type:mongoose.Schema.Types.ObjectId,ref:"Group"}
})
module.exports= mongoose.model('Gift',giftSchema)