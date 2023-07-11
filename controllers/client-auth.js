
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
  const { login, password } = req.body;

  const isUser = await connection.query(
       `SELECT * FROM clients   
        WHERE phone = ? AND role = ?`, [login, "USER"]);
    
    if (isUser[0].length == 0) {
      res.status(400).json({ message: 'Не верный логин или пароль' })   
          return
  }


  const validPassword = bcrypt.compareSync(password, isUser[0][0].password);

    if (!validPassword) {
      return  res.status(400).json({message: 'Не верный логин или пароль'})        
  }  

     const token = generateAccessToken(isUser[0][0].id, isUser[0][0].role)
  res.status(200).json({ token: token, user: {id: isUser[0][0].id, name: isUser[0][0].name,  email: isUser[0][0].email, phone: isUser[0][0].phone} })  
  
} 

// проверка при входе по токену из локалстороджа
const authUserToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
   return  res.status(403).json({message: "ошибка авторизации"})
  }

  // добавить логику получения юзера и отдавать готоовго юзера

  const decoderToken = jwt.verify(token, secret)
  console.log(decoderToken.id)

    const user = await connection.query(
       `SELECT clients.name, clients.id, clients.phone, clients.email FROM clients   
        WHERE id = ? `, [decoderToken.id]);

  res.status(200).json({user: user[0]})  
  
} 


// регистрация нового пользователя

const reginUser = async (req, res) => {
  const { login, password, repeaPassword } = req.body;

  if (login == "" || password == "" || repeaPassword == "") {
      res.status(400).json({ message: 'Заполните все поля' })   
    return
  }

    if (password != repeaPassword) {
    res.status(400).json({ message: 'Пароли не совпадают' })   
    return
  }

const isUser = await connection.query(
       `SELECT * FROM clients   
        WHERE phone = ? AND role = ?`, [login, "USER"]);
    
  if (isUser[0].length > 0) {
     
      res.status(400).json({ message: 'Такой пользователь уже существует' })   
          return
  }

   let date = new Date()
      let dateBase = `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + (date.getMonth()+1) : date.getMonth()}-${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`


     //создание нового пользователя
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
 const resp = await connection.execute(
   `INSERT INTO clients(id, name, phone, email, role, password, timestamp) VALUE (?, ?, ?, ?, ?, ?, ?)`,
   [null, null, login, null, "USER", passwordHash, dateBase]);       

  res.status(200).json({ data: resp, status: true })  
  
   
} 

//внесение изменений в пользователя
const editUser = async (req, res) => {
  const { idUser, name, phone, phoneUserNow, nowPassword, password, repeaPassword } = req.body;

  console.log(req.body)



  if (phone != phoneUserNow) {
    const isUser = await connection.query(
       `SELECT * FROM clients   
        WHERE phone = ? AND role = ?`, [phone, "USER"]);
    
  if (isUser[0].length > 0) {     
      res.status(400).json({ message: 'Такой пользователь уже существует' })   
          return
  }
  }
  

   const user = await connection.query(
       `SELECT * FROM clients   
        WHERE id = ?`, [idUser]);

        let passwordUser = user[0][0].password


  if (nowPassword && password && repeaPassword) {
 if (password != repeaPassword) {
    res.status(400).json({ message: 'Пароли не совпадают' })   
    return
    }
  
    const validPassword = bcrypt.compareSync(nowPassword, passwordUser);
    if (!validPassword) {
      return  res.status(400).json({message: 'Не верный пароль'})        
  }  

    const salt = await bcrypt.genSalt(10)
   passwordUser = await bcrypt.hash(password, salt)
    
  }

  
    
     const resp = await connection.execute(
      `UPDATE clients SET name = ?, phone = ?, password = ? WHERE id = ?`,
      [name, phone, passwordUser, idUser]); 
   res.status(200).json({ data: resp, status: true }) 



  
   
} 
module.exports = {
  authUser,
  authUserToken,
  reginUser,
  editUser
};

