const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");
const { errorHandle } = require("../middleware/errorHandle");
router.get("/", Controller.getAllProducts);
router.get("/categories", Controller.getAllCategories);
router.get("/:id", Controller.getProductById);
router.use(errorHandle);

module.exports = router;
