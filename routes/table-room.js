const express = require("express");
const { getTable, addTable, delTable, updateTable } = require("../controllers/table");
const router = express.Router();


router.get("/", getTable);
router.post("/", addTable);
router.delete("/", delTable);
router.put("/", updateTable);
module.exports = router;