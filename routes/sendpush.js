const express = require("express");
const {sendpush, getpush} = require("../controllers/sendpush");
const router = express.Router();


router.post("/",sendpush);
router.get("/",getpush);

module.exports = router;


