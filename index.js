require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

const AServer = express()
AServer.use(cors())
AServer.use(express.json())
AServer.use(router)

const PORT = 3000 || process.env.PORT

AServer.listen(PORT,()=>{
    console.log(`AServer started at ${PORT}`);
})

AServer.get('/',(req,res)=>{
    res.status(200).send("<h1>AServer Started</h1>")
})