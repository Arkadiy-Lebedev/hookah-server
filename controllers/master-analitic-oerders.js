

const {connection} = require("./db");



//группировка и сумма по месяцам
// select Month(DATE(time_start)), SUM(total_price) FROM `booking` GROUP BY Month(DATE(time_start))


const getOrderMaster = async (req, res) => {  
  const { id } = req.body 
  console.log(req.body)
    try {       

     const resp = await connection.execute(`SELECT orders.id, products.name, booking.client_id, booking.id AS booking, table_room.number, products.price, orders.count, DATE_FORMAT(booking.time_start,'%H:%i') AS "timeStart",  booking.status,  booking.sales 
     FROM products RIGHT JOIN orders ON products.id = orders.product_id LEFT JOIN booking ON orders.booking_id = booking.id 
     LEFT JOIN table_room ON booking.table_id = table_room.id      
     WHERE  booking.id = ?`, [id]);


      if (resp[0].length > 0) {
        const resp2 = await connection.execute(`SELECT name, phone 
     FROM clients       
     WHERE  id = ?`, [resp[0][0].client_id]);
     res.status(200).json({data: resp[0], client:resp2[0]}) 
      } else {
      res.status(200).json({data: resp[0], client:[]})   
     }
   
     

         
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};




const getOrderPeriodMaster = async (req, res) => {  
  const { dateOne, dateTwo } = req.body
  console.log(req.body)
  console.log(dateOne)
    console.log(dateTwo)
    try {       
      // полчаем все заказы за дату
    //  const resp = await connection.execute(`SELECT orders.id, products.name, booking.id AS booking, table_room.number, products.price, orders.count, DATE_FORMAT(booking.time_start,'%H:%i') AS "timeStart", 
    //  DATE_FORMAT(booking.time_start,'%Y-%m-%d') AS "dateStart",  booking.status,  booking.sales 
    //  FROM products RIGHT JOIN orders ON products.id = orders.product_id 
    //  LEFT JOIN booking ON orders.booking_id = booking.id LEFT JOIN table_room ON booking.table_id = table_room.id WHERE DATE(time_start) BETWEEN ? AND ?`, [dateOne, dateTwo]);

    const resp = await connection.execute(`SELECT booking.id AS bookingId, table_room.number,DATE_FORMAT(booking.time_start,'%H:%i') AS "timeStart", 
    DATE_FORMAT(booking.time_start,'%Y-%m-%d') AS "dateStart",  booking.status,  booking.sales, booking.total, booking.total_price
    FROM booking RIGHT JOIN table_room ON booking.table_id = table_room.id WHERE DATE(time_start) BETWEEN ? AND ?`, [dateOne, dateTwo]);


console.log(resp[0])

         res.status(200).json({data: resp[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};

 



module.exports = {
  getOrderMaster,
  getOrderPeriodMaster
  
};

