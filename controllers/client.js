

const {connection} = require("./db");


  //добавляет бронь 
const addBooking = async (req, res) => {  
  const { tableId, timeStart, timeFinish, clientId, orderClient, status } = req.body
console.log(req.body)
  try {          

    const resp = await connection.execute(
      `INSERT INTO booking(id, table_id, time_start, time_finish, client_id, order_client, status) VALUE (?, ?, ?, ?, ?, ?, ?)`,
      [null, tableId, timeStart, null, clientId, orderClient, status]);        
      res.status(200).json({data: resp[0]})
            
  } catch {
    res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее стол" });
  }
};

const getBookingDate = async (req, res) => {  
  const { date } = req.body

    try {    
     
     const resp = await connection.query(
       `SELECT booking.id, DATE_FORMAT(booking.time_start,'%Y-%m-%d %H:%i') AS "timeStart", booking.table_id, booking.time_finish, booking.client_id, booking.order_client, booking.status, table_room.name, table_room.number  FROM booking RIGHT JOIN table_room ON booking.table_id = table_room.id LEFT JOIN clients ON booking.client_id = clients.id 
       WHERE DATE(time_start) = ? OR (status = "active" AND DATE(time_start) - interval 1 day = ?) ORDER BY time_start`, [date, date]);   
         console.log(resp[0])     
         res.status(200).json({data: resp[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};



module.exports = {
  addBooking,
  getBookingDate
};

