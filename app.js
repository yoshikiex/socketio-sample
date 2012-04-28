var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var online = 0;

io.sockets.on('connection', function (socket) {
  ++online;
  io.sockets.emit("onlineNum", {"onlineNum": online});

  socket.on('sendMsg', function (data) {
//      socket.emit("sendBack", data);
      io.sockets.emit("sendBack", data);
  });
  socket.on("disconnect", function() {
    --online;
      io.sockets.emit("onlineNum", {"onlineNum": online});
  });
});