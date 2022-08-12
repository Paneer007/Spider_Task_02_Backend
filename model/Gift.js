const mongoose = require('mongoose')
const giftSchema = mongoose.Schema({
    to:mongoose.Schema.Types.ObjectId,
    by:mongoose.Schema.Types.ObjectId,
    name: String
})
module.exports= mongoose.model('Gift',giftSchema)