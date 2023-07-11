const express = require("express");
const { addBooking, getBookingDate } = require("../controllers/client");
const router = express.Router();



router.post("/", addBooking);
router.post("/table_list", getBookingDate);

module.exports = router;


