var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(ip);
});

io.on("connection", function(socket) {
  socket.on("room", function(room) {
    socket.join(room.room);
    console.log(`${room.name} joined ${room.room}`);
    socket.broadcast
      .to(room.room)
      .emit("room_confirm", `${room.name} joined ${room.room}`);
    console.log(Object.keys(io.nsps["/"].adapter.rooms["vagabond"]).sockets);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected!");
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
