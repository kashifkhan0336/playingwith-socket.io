var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log(`a user connected at ${Date()}`);
  socket.emit("socket_id", socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected!");
  });
  socket.on("message", function(msg) {
    console.log(`Message recevied ${msg}`);
    socket.broadcast
      .to(msg.socketId)
      .emit("message", `Your Message : ${msg.message}`);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
