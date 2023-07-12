const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
require('dotenv').config()
const port = process.env.PORT || 5000;

const cors = require('cors');
const corsOptions ={
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
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
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/master/admin", require("./routes/master"));
app.use("/api/master/tables", require("./routes/master-tables"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/client/booking", require("./routes/client"));
app.use("/api/client/products", require("./routes/client-products"));
app.use("/api/client/categories", require("./routes/client-categories"));
app.use("/api/client/auth", require("./routes/client-auth"));
app.use("/api/client/sale", require("./routes/client-sale"));

app.use("/api/firebase", require("./routes/firebase"));
app.use("/api/sendpush", require("./routes/sendpush"));
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });



io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);

  socket.on('create', function (data, callback) {   
     io.emit('update', {status: true});
callback({
      status: "ok"
    })
  });




    socket.on('disconnect', function () {
    console.log('разъединился: ', socket.id);
   
  });
  
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);

   
  });





