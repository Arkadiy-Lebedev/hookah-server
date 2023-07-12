const express = require("express");
const { getAllTable, editTable } = require("../controllers/admin-tables");
const router = express.Router();
const path = require('path')
const multer = require("multer");

const storage = multer.diskStorage({  
    destination: './assets/',
  filename: (req, file, cb) => {  
      cb(null, `--${file.originalname.split('.')[0]}--hookah-${Date.now()}${path.extname(file.originalname)}`.toLowerCase().replace(' ', '-'))
    }
})

const upload = multer({ storage })

router.get("/", getAllTable);


router.put("/",upload.fields([{
    name: 'file', maxCount: 1
}]), editTable);
  


module.exports = router;


