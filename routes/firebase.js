const express = require("express");
const { firebaseAddToken} = require("../controllers/firebase");
const router = express.Router();





router.post("/", firebaseAddToken);

module.exports = router;


