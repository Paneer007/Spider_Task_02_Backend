require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const signupRouter = require('./controller/signupRouter')
const loginRouter = require('./controller/loginRouter')
const userdataRouter = require('./controller/userdataRouter')
const groupRouter = require("./controller/groupRouter")
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log('no error') 
}catch(error){
    console.log('error')
}
app.use(express.json())
app.use(cors())
app.use('/api/signup',signupRouter)
app.use('/api/login',loginRouter)
app.use('/api/userdata',userdataRouter)
app.use('/api/groupdata',groupRouter)
app.use(express.static('public'))
module.exports = app