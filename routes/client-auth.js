const express = require("express");
const { authUser, authUserToken, reginUser, editUser} = require("../controllers/client-auth");
const router = express.Router();





router.post("/", authUser);
router.post("/token", authUserToken);
router.post("/regin", reginUser);
router.post("/edit", editUser);

module.exports = router;


