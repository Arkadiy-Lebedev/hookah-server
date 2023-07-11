const express = require("express");

const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
// Для парсинга application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Абсолютный путь к папке с картинками
app.use("/static", express.static(__dirname + "/assets"));


//роуты
app.use("/api/work/booking", require("./routes/work"));
app.use("/api/admin/table_room", require("./routes/table-room"));
app.use("/api/admin/action_table", require("./routes/admin-action-table"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});






// node --unhandled-rejections=strict server.js
// mongodb://localhost:27017

