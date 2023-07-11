const express = require("express");
const { getOrderClient, addOrderClient } = require("../controllers/orders");
const router = express.Router();



router.post("/booking", getOrderClient);
router.post("/add", addOrderClient);

module.exports = router;


