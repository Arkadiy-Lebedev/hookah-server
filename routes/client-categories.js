const express = require("express");
const { getCategories } = require("../controllers/client-categories");
const router = express.Router();




router.get("/", getCategories);


module.exports = router;


