const mongoose = require("mongoose")
const groupSchema = new mongoose.Schema({
    name:String,
    date: Date,
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    roomId:String,
    budget:Number,
    location:String,
    locked:{
        type:String,
        enum:['Open','Locked'],
        default:"Open"
    },
    creatorId:mongoose.Schema.Types.ObjectId
})
module.exports= mongoose.model("Group",groupSchema)