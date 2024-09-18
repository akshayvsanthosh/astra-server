const grievances = require("../Models/grievanceModel");
const admins = require("../Models/adminModel");
const jwt = require('jsonwebtoken')

// login
exports.loginController = async (req, res) => {
    console.log("inside loginController");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await admins.findOne({ email })        
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
            res.status(200).json({
                user: existingUser,
                token
            })
        } else {
            res.status(404).json("Invalid email/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all grievance
exports.getAllGrievanceContoller = async (req, res) => {
    console.log("Inside getAllGrievanceContoller");
    try {
        const allGrievance = await grievances.find()
        res.status(200).json(allGrievance)
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}

// update grievance status
exports.updateGrievanceStatusContoller = async (req, res) => {
    console.log("Inside updateGrievanceStatusContoller");
    const {gId} = req.params
    const {userId, fullName, email, category, grievance, location,grvncStatus } = req.body
    console.log(userId, fullName, email, category, grievance, location, grvncStatus, gId);
    try {
        const updatedGrievance = await grievances.findByIdAndUpdate({_id:gId},{userId,fullName, email, category, grievance, location,grvncStatus})
        await updatedGrievance.save()
        res.status(200).json(updatedGrievance)
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}