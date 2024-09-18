const mongoose = require('mongoose')

const grievanceSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    grievance:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    grvncStatus:{
        type:Number
    }
})

const grievances = mongoose.model("grievances",grievanceSchema)

module.exports=grievances