
const bcrypt = require('bcrypt');
const {connection} = require("./db");

const getAllAdmin = async (req, res) => {
   const resp = await connection.query(
       `SELECT * FROM clients   
        WHERE role = ?`, ['ADMIN']);   
 res.status(200).json({data: resp[0], status: true})  
}


const getUsers = async (req, res) => {
   const resp = await connection.query(
     `SELECT clients.name, clients.phone, DATE_FORMAT(clients.timestamp,'%d.%m.%Y %H:%i') AS timestamp FROM clients WHERE role = ? ORDER by timestamp`, ['USER']);
  res.status(200).json({ data: resp[0], status: true })  
}


const delAdmin = async (req, res) => {
  const { id } = req.body;
   const resp = await connection.query(    
       `DELETE FROM clients   
        WHERE id = ?`, [id]);   
 res.status(200).json({data: resp[0], status: true})  
} 



const addAdmin = async (req, res) => { 
    const { phone, password, dublePasswors } = req.body;
console.log(req.body)


      if (password != dublePasswors) {
    res.status(400).json({ message: 'Пароли не совпадают' })   
    return
}

  try {   

 const isAdmin = await connection.query(
       `SELECT * FROM clients   
        WHERE phone = ?`, [phone]);   
    console.log(isAdmin[0])     
    if (isAdmin[0].length > 0) {
      console.log(222)
      res.status(400).json({ message: 'Такой администратор существует' })   
          return
         }

             //создание нового пользователя
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
 const resp = await connection.execute(
   `INSERT INTO clients(id, name, phone, email, role, password) VALUE (?, ?, ?, ?, ?, ?)`,
   [null, null, phone, null, "ADMIN", passwordHash]);        
      res.status(200).json({data: resp, status: true})  
  

   } catch {
      res.status(500).json({ status: "error", message: "ошибка" });
    } 

};

module.exports = {
  addAdmin,
  getAllAdmin,
  delAdmin,
getUsers
};

