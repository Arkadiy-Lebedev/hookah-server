const express = require("express");
const { getAllBooking, addBooking, getBookingDate, addBookingForAdmin, delBooking, succesBooking, addComment } = require("../controllers/booking");
const router = express.Router();


router.get("/", getAllBooking);
router.post("/", addBooking);
router.put("/succes", succesBooking);
router.post("/admin", addBookingForAdmin);
router.post("/booking-date", getBookingDate);
router.put("/comment", addComment);
router.delete("/", delBooking);

module.exports = router;


