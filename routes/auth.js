const express = require("express");
const { authUser, authUserToken} = require("../controllers/auth");
const router = express.Router();





router.post("/", authUser);
router.post("/token", authUserToken);
module.exports = router;


