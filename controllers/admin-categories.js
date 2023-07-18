

const {connection} = require("./db");

const editCategories = async (req, res) => { 

  console.log(req.body)
  const {id, type } = req.body
 let linkProduct
  if (req.files.file) {       
      linkProduct = `${process.env.EDDFILES}/static/${req.files.file[0].filename}`
  } else {
     const resp = await connection.execute(
       `SELECT categories.image FROM categories WHERE id = ${id}`);      
         linkProduct =resp[0][0]["image"]
         console.log(linkProduct)     
  } 
  console.log(linkProduct)
  try {   
      console.log(linkProduct)
    const resp = await connection.execute(
      `UPDATE categories SET type = ?,  image = ? WHERE id = ?`,
      [type, linkProduct, id]); 
          
      res.status(200).json({data: resp, status: true})  
   } catch {
      res.status(500).json({ status: "error", message: "ошибка" });
    } 

};


const addCategories = async (req, res) => { 
  const { type } = req.body

  if(!req.files.file){
    res.status(500).json({ status: "error", message: "Прикрепите изображение" });
    return
  }

  let linkProduct = `${process.env.EDDFILES}/static/${req.files.file[0].filename}`
  console.log(linkProduct)
  try {   
 const resp = await connection.execute(
   `INSERT INTO categories(id, type, image, sort) VALUE (?, ?, ?, ?)`,
   [null, type, linkProduct, null]);        
      res.status(200).json({data: resp, status: true})  
   } catch {
      res.status(500).json({ status: "error", message: "ошибка" });
    } 

};

const delCategories = async (req, res) => {
  const { id } = req.body;
   const resp = await connection.query(    
       `DELETE FROM categories   
        WHERE id = ?`, [id]);   
 res.status(200).json({data: resp[0], status: true})  
} 





module.exports = {
  editCategories,
  addCategories,
  delCategories
};

