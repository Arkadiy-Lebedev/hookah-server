

const {connection} = require("./db");

const getAllTable = async (req, res) => {  
console.log(23423)
    try {      

     const resp = await connection.execute(
       `SELECT table_room.id, table_room.name, table_room.description, table_room.image 
         FROM table_room`);        
         res.status(200).json({data: resp[0]})   
          
    } catch {
      res.status(500).json({ status: "error", message: "Не удалось получить список , повторите попытку познее" });
    }
};

 



const editTable = async (req, res) => { 
  console.log(46548798)
  console.log(req.body)
  const {id, name, description } = req.body
 let linkProduct
  if (req.files.file) {       
      linkProduct = `${process.env.EDDFILES}:${process.env.PORT}/static/${req.files.file[0].filename}`
  } else {
     const resp = await connection.execute(
       `SELECT table_room.image FROM table_room WHERE id = ${id}`);      
         linkProduct =resp[0][0]["image"]
         console.log(linkProduct)     
  } 
  console.log(linkProduct)
  try {   
      console.log(linkProduct)
    const resp = await connection.execute(
      `UPDATE table_room SET name = ?, description = ?, image = ? WHERE id = ?`,
      [name, description, linkProduct, id]); 
          
      res.status(200).json({data: resp, status: true})  
   } catch {
      res.status(500).json({ status: "error", message: "ошибка" });
    } 

};







module.exports = {
  getAllTable,
  editTable
};

