const mongoose = require('mongoose')
const connection_string=process.env.CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log("AServer connected to mongoDb");
}).catch((error)=>{
    console.log("Connection failde");
    console.log(error);
})