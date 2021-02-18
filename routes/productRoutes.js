const express = require("express");
const router = express.Router();

//  a Route for getting all products

const {
    getAllProducts,
    getProductById,
} = require("../controller/productControllers");

router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;