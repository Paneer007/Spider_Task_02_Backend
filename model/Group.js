const mongoose = require("mongoose")
const groupSchema = new mongoose.Schema({
    name:String,
    data: Date,
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    roomId:String,
    budget:String,
    location:String,
    locked:{
        type:String,
        enum:['Open','Locked'],
        default:"Open"
    }
})
module.exports= mongoose.model("Group",groupSchema)