const express = require("express");
const { getAllProduct, addProduct, getCategories, editProduct, productInCategories } = require("../controllers/products");
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

router.get("/", getAllProduct);
router.put("/", upload.fields([{
    name: 'file', maxCount: 1
}]), editProduct);
router.post("/",upload.fields([{
    name: 'file', maxCount: 1
}]), addProduct);
  
router.get("/categories", getCategories);
router.post("/categories", productInCategories);

module.exports = router;


