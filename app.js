var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var path = require('path');
var bs = require('bonescript');
var filePath = path.join(__dirname);

app.listen(8090);

function handler (req, res) {
  fs.readFile(filePath + '/public/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html' + err);
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('led', function (data) {
    console.log(data);
    if (data == 'on'){
        bs.digitalWrite("USR3", bs.HIGH);
        socket.emit('ledstatus', 'on');
        socket.broadcast.emit('ledupdate', 'on');

    }else{
        bs.digitalWrite("USR3", bs.LOW);
        socket.emit('ledstatus', 'off');
        socket.broadcast.emit('ledupdate', 'off');
    }
  });
});