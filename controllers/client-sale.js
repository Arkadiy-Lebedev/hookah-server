

const {connection} = require("./db");


// получаем продукты по категории
const getSales = async (req, res) => {  

    try {       

const sales = await connection.execute(
       `SELECT * 
         FROM sale `);     

res.status(200).json({data: sales[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};





module.exports = {
 getSales
};

