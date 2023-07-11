

const {connection} = require("./db");


// получаем продукты по категории
const getProductsCategories = async (req, res) => {  
 const { id } = req.body
    try {       

const categories = await connection.execute(
       `SELECT categories.type 
         FROM categories WHERE id = ?`,[id]);     

     const resp = await connection.execute(
       `SELECT products.id, products.name, products.discription_product, products.image_product, products.price, categories.type 
         FROM products LEFT JOIN categories ON products.id_categories = categories.id WHERE categories.id = ?`,[id]);        
         res.status(200).json({data: resp[0], categories:categories[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};





module.exports = {
 getProductsCategories
};

