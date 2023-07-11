const express = require("express");
const { activeTable, infoTable } = require("../controllers/admin-action-table");
const router = express.Router();



router.post("/", activeTable);
router.post("/info", infoTable);

module.exports = router;


