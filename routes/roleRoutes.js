const express = require("express");
const router = express.Router();
const roleController = require("../controller/roleController/roleController");
const adminAuthMiddleware=require("../middlewares/superAdmin")
router.post("/",adminAuthMiddleware, roleController.createRole);
router.get("/",adminAuthMiddleware, roleController.getAllRoles);
router.get("/:id",adminAuthMiddleware, roleController.getRoleById);
router.put("/:id", adminAuthMiddleware,roleController.updateRole);
router.delete("/:id",adminAuthMiddleware, roleController.deleteRole);

module.exports = router;
