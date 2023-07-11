
const bcrypt = require('bcrypt');
const {connection} = require("./db");
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role
  }

  return jwt.sign(payload, secret)
}

const authUser = async (req, res) => {
  const { phone, password } = req.body;

const isUser = await connection.query(
       `SELECT * FROM clients   
        WHERE phone = ?`, [phone]);   

    
    if (isUser[0].length == 0) {
      res.status(400).json({ message: 'Не верный логин или пароль' })   
          return
  }

  const validPassword = bcrypt.compareSync(password, isUser[0][0].password);

    if (!validPassword) {
      return  res.status(400).json({message: 'Не верный логин или пароль'})        
    }  

    const token = generateAccessToken(isUser[0][0].id, isUser[0][0].role)
  res.status(200).json({name: 'Admin', token: token, role: isUser[0][0].role})  
  
} 

const authUserToken = async (req, res) => {
  const { token } = req.body;
console.log(46545)
  console.log(token)

  if (!token) {
   return  res.status(403).json({message: "ошибка авторизации"})
  }

  const decoderToken = jwt.verify(token, secret)
  res.status(200).json({role: decoderToken.role})  
  
} 

module.exports = {
  authUser,
  authUserToken
};

