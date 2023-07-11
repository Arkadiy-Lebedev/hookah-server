const express = require("express");
const { getAllBooking, addBooking, getBookingDate, addBookingForAdmin, delBooking, succesBooking } = require("../controllers/booking");
const router = express.Router();


router.get("/", getAllBooking);
router.post("/", addBooking);
router.put("/succes", succesBooking);
router.post("/admin", addBookingForAdmin);
router.post("/booking-date", getBookingDate);
router.delete("/", delBooking);

module.exports = router;


