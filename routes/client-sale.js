const express = require("express");
const { getSales } = require("../controllers/client-sale");
const router = express.Router();




router.get("/", getSales);


module.exports = router;


