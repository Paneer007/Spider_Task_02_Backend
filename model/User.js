const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    date: Date,
    groups:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Group"
        }
    ],  
})
module.exports = mongoose.model('User',userSchema)