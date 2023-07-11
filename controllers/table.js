

const {connection} = require("./db");

const getTable = async (req, res) => {  

    try {        
     const resp = await connection.execute(
         `SELECT * FROM table_room`);        
         res.status(200).json({data: resp[0]})      
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};
  
const addTable = async (req, res) => { 

  const { name, number, description } = req.body
  try {
    const resp = await connection.execute(
      `INSERT INTO table_room(id, name, number, description) VALUE (?, ?, ?, ?)`, [null, name, number, description]);        
      res.status(200).json({data: resp})    
            
  } catch {
    res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее стол" });
  }
};


const delTable = async (req, res) => { 
  const { id } = req.body
  try {
    const resp = await connection.execute(
      `DELETE FROM table_room WHERE id = ?`, [id]);        
      res.status(200).json({data: resp})
  } catch {
    res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее стол" });
  }
};

const updateTable = async (req, res) => { 
console.log(req)
  const { name, number, description, id } = req.body
  try {
    const resp = await connection.execute(
      `UPDATE table_room SET name = ?, number = ?, description = ? WHERE id = ?`, [name, number, description, id]);        
      res.status(200).json({data: resp})    
            
  } catch {
    res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее стол" });
  }
};


module.exports = {
  getTable,
  addTable,
  delTable,
  updateTable
};

