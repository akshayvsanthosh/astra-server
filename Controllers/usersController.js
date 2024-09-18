const users = require("../Models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const grievances = require("../Models/grievanceModel")
const nodemailer = require("nodemailer")


// register
exports.registerController = async (req, res) => {
    // console.log("Inside registerController");
    const { uName, email, password } = req.body
    console.log(uName, email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Account already exist.. Please login!")
        } else {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json("Error hashing password");
                }

                const newUser = new users({ name: uName, email, password: hash })
                await newUser.save()
                res.status(200).json(newUser)
            });
        }
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}

// login
exports.loginController = async (req, res) => {
    console.log("inside loginController");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            bcrypt.compare(password, existingUser.password, function (err, isMatch) {
                if (err) {
                    return res.status(500).json("Login Failed");
                }
                if (!isMatch) {
                    return res.status(404).json("Invalid email/password");
                }
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
                res.status(200).json({
                    user: existingUser,
                    token
                })
            })
        } else {
            res.status(404).json("Invalid email/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// submit grievance
exports.grievanceContoller = async (req, res) => {
    console.log("Inside grievanceContoller");
    const userId = req.payload
    const grvncStatus = 10
    const { fullName, email, category, grievance, location } = req.body
    console.log(fullName, email, category, grievance, location);
    try {
        const newGrievance = new grievances({ userId,fullName:fullName, email, category, grievance, location,grvncStatus })
        await newGrievance.save()
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "d37966315@gmail.com",
                pass: "orhu xrfg fzco zoim"
            }
        })
        const message = {
            from: "d37966315@gmail.com",
            to: "d37966315@gmail.com",
            subject: "New Grievance",
            text: `New Grievance added by ${fullName}`,
        };
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);

            }
        })
        res.status(200).json(newGrievance)
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}

// get grievance
exports.getGrievanceContoller = async (req,res)=>{
    console.log("Inside getGrievanceContoller");
    const userId = req.payload
    console.log(userId);
    
    try {
        const allGrievance = await grievances.find({userId})
        res.status(200).json(allGrievance)
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
        
    }
}