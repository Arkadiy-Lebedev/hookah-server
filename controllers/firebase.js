

const {connection} = require("./db");



const firebaseAddToken = async (req, res) => {
  const { token } = req.body;
  console.log(req)
console.log(55555)
 try {   
 const resp = await connection.execute(
   `INSERT INTO firebase(id, token, id_client) VALUE (?, ?, ?)`,
   [null, token, null]);        
      res.status(200).json({data: resp, status: true})  
   } catch {
      res.status(500).json({ status: "error", message: "ошибка" });
    } 
  
} 


module.exports = {
  firebaseAddToken
};

