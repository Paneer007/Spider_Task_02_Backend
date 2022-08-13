const mongoose = require("mongoose")
const groupSchema = new mongoose.Schema({
    name:String,
    date: Date,
    password:String,
    participants:[
            {
                Details:
                    {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"User",
                    },
                DateOfJoining: Date
            }
    ],
    roomId:String,
    budget:String,
    location:String,
    locked:{
        type:String,
        enum:['Open','Locked'],
        default:"Open"
    },
    creatorId:mongoose.Schema.Types.ObjectId
})
module.exports= mongoose.model("Group",groupSchema)