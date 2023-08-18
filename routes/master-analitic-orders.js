const express = require("express");
const { getOrderMaster, getOrderPeriodMaster } = require("../controllers/master-analitic-oerders");
const router = express.Router();



router.post("/", getOrderMaster);
router.post("/period", getOrderPeriodMaster);

module.exports = router;


