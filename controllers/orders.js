

const {connection} = require("./db");



const getOrderClient = async (req, res) => {  
  const { id } = req.body
  console.log(req.body)
    try {       
     const resp = await connection.query(
       `SELECT orders.id, products.name, products.discription_product, products.image_product, products.price, orders.count FROM products RIGHT JOIN orders ON products.id = orders.product_id LEFT JOIN booking ON orders.booking_id = booking.id  
        WHERE booking.id = ?`, [id]);   
         console.log(resp[0])     
         res.status(200).json({data: resp[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};

 
const addOrderClient = async (req, res) => {  
  const { idBooking, idProduct, count } = req.body
  console.log(req.body)
    try {       
     const resp = await connection.execute(
   `INSERT INTO orders(id, product_id, count, booking_id) VALUE (?, ?, ?, ?)`,
   [null, idProduct, count, idBooking]);   
         console.log(resp[0])     
         res.status(200).json({data: resp[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
}; 


module.exports = {
  getOrderClient,
  addOrderClient
};

