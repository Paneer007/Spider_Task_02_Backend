const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected Successfully")
    })
    .catch(()=>{
        console.log("Connection unsuccesful")
    })
app.use(express.static('public'))
module.exports = app