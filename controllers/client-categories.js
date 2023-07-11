

const {connection} = require("./db");


// получаем продукты по категории
const getCategories = async (req, res) => {  

    try {       

const categories = await connection.execute(
       `SELECT * 
         FROM categories `);     

res.status(200).json({data: categories[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};





module.exports = {
 getCategories
};

