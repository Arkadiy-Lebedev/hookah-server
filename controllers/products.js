

const {connection} = require("./db");

const getAllProduct = async (req, res) => {  

    try {   
    

     const resp = await connection.execute(
       `SELECT products.id, products.name, products.discription_product, products.image_product, products.price, categories.type, categories.id AS categories_id 
         FROM products LEFT JOIN categories ON products.id_categories = categories.id`);        
         res.status(200).json({data: resp[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};

// получаем продукты по категории
const productInCategories = async (req, res) => {  
 const { id } = req.body
    try {       

     const resp = await connection.execute(
       `SELECT products.id, products.name, products.discription_product, products.image_product, products.price, categories.type, categories.id AS categories_id 
         FROM products LEFT JOIN categories ON products.id_categories = categories.id WHERE categories.id = ?`,[id]);        
         res.status(200).json({data: resp[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};

  
const addProduct = async (req, res) => { 
  const { name, price, categories, description } = req.body

  let linkProduct = `${process.env.EDDFILES}:${process.env.PORT}/static/${req.files.file[0].filename}`
  console.log(linkProduct)
  try {   
 const resp = await connection.execute(
   `INSERT INTO products(id, name, discription_product, image_product, id_categories, price) VALUE (?, ?, ?, ?, ?, ?)`,
   [null, name, description, linkProduct, categories, price]);        
      res.status(200).json({data: resp, status: true})  
   } catch {
      res.status(500).json({ status: "error", message: "ошибка" });
    } 

};


const editProduct = async (req, res) => { 
  console.log(46548798)
  console.log(req.body)
  const {id, name, price, categories, description } = req.body
 let linkProduct
  if (req.files.file) {       
      linkProduct = `${process.env.EDDFILES}:${process.env.PORT}/static/${req.files.file[0].filename}`
  } else {
     const resp = await connection.execute(
       `SELECT image_product FROM products WHERE id = ${id}`);      
         linkProduct =resp[0][0]["image_product"]
         console.log(linkProduct)     
  } 
  console.log(linkProduct)
  try {   
    const resp = await connection.execute(
      `UPDATE products SET name = ?, discription_product = ?, image_product = ?, id_categories = ?, price = ? WHERE id = ?`,
      [name, description, linkProduct, categories, price, id]); 
          
      res.status(200).json({data: resp, status: true})  
   } catch {
      res.status(500).json({ status: "error", message: "ошибка" });
    } 

};


const getCategories = async (req, res) => {  

    try {  
     const resp = await connection.execute(
       `SELECT * FROM categories`);        
         res.status(200).json({data: resp[0]})   
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
   const resp = await connection.query(    
       `DELETE FROM products   
        WHERE id = ?`, [id]);   
 res.status(200).json({data: resp[0], status: true})  
} 




module.exports = {
  getAllProduct,
  addProduct,
  getCategories,
  editProduct,
  productInCategories,
  deleteProduct
};

