
const {connection} = require("./db");


  
const activeTable = async (req, res) => {  
  const { id } = req.body
  try {

    const status = "active"

    const resp = await connection.execute(
      `UPDATE booking SET status = ? WHERE id = ?`, [status, id]);        
      res.status(200).json({data: resp[0]})
            
  } catch {
    res.status(500).json({ status: "error", message: "Не удалось внести изменение" });
  }
};

const infoTable = async (req, res) => {  
  const { number } = req.body
  try {


    const resp = await connection.execute(
      `SELECT * FROM table_room WHERE number = ?`, [number]);        
      res.status(200).json({data: resp[0]})
            
  } catch {
    res.status(500).json({ status: "error", message: "Не удалось внести изменение" });
  }
};



module.exports = {
  activeTable,
  infoTable
  
};

