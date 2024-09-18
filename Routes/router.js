const express = require('express')
const userController = require('../Controllers/usersController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const adminController = require('../Controllers/adminController')

const router = new express.Router()

// register user
router.post("/register",userController.registerController)

// login user
router.post("/user/login",userController.loginController)

// grievance submit
router.post("/user/submitgrievance",jwtMiddleware,userController.grievanceContoller)

// get grievance
router.get("/getGrievance",jwtMiddleware,userController.getGrievanceContoller)

// login user
router.post("/admin/login",adminController.loginController)

// get all grievance
router.get("/getAllGrievance",jwtMiddleware,adminController.getAllGrievanceContoller)

//update grievance status
router.put("/admin/grievanceStatus/:gId/update",jwtMiddleware,adminController.updateGrievanceStatusContoller)

module.exports=router