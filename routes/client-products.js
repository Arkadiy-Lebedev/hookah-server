const express = require("express");
const { getProductsCategories } = require("../controllers/client-products");
const router = express.Router();




router.post("/", getProductsCategories);


module.exports = router;


