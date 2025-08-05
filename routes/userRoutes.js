const express = require("express");
const router = express.Router();
const userController = require("../controller/userController/userController");
const authMiddleware =require("../middlewares/userAuth")
const authAdminMiddleware =require("../middlewares/superAdmin")
router.get("/",authAdminMiddleware, userController.getAllUser);
router.post("/", userController.createUser);
router.post("/login",userController.loginUser)
module.exports = router;
