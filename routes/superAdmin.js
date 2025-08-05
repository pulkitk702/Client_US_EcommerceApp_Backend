const express = require("express");
const router = express.Router();

const superAdmin = require("../controller/superAdminController/superAdminController");
router.post("/assign", superAdmin.assignStoreAdmin);
router.post("/create", superAdmin.createSuperAdmin);
router.post("/login", superAdmin.loginSuperAdmin);

module.exports = router;
