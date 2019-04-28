// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

const PORT = 5000

app.set('port', PORT);
app.use('/game', express.static(__dirname + '/game'));


// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'Tetris.html'));
});
// Starts the server.

io.on('connection', function(socket){
  console.log('User Connected');
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
});


server.listen(PORT, function() {
  console.log('Starting server on port ' + PORT);
});
