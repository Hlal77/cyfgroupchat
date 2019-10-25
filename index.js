var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(8080, () => console.log("server runing"));
app.use(express.static("public_html"));
var sio = socket(server);
sio.on("connection", function(visitor) {
  console.log("we have a new visitor as id =", visitor.id);
  visitor.on("message", function(data) {
    sio.sockets.emit("new_msg", data);
  });
  visitor.on("broadcast", function(data) {
    visitor.broadcast.emit("new_broadcast", data);
  });
});
