const express = require("express");
const router = express.Router();
const storeController = require("../controller/storeController/storeController");
const authMiddleWare=require("../middlewares/superAdmin")
router.get("/",authMiddleWare, storeController.getStores);
router.get("/:id",authMiddleWare, storeController.getStoreById);
router.post("/",authMiddleWare, storeController.createStore);
router.put("/:id",authMiddleWare, storeController.updateStore);
router.delete("/:id",authMiddleWare, storeController.deleteStore);

module.exports = router;
