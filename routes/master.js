const express = require("express");
const { addAdmin, getAllAdmin, delAdmin, getUsers} = require("../controllers/master");
const router = express.Router();




router.get("/", getAllAdmin);
router.post("/", addAdmin);
router.delete("/", delAdmin);
router.get("/users", getUsers);
module.exports = router;


