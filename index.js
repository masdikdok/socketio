let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
    console.log('listening on *:' + port);
});

var pathSockets = require("path").join(__dirname, "./sockets");

require("fs").readdirSync(pathSockets).forEach(function(file) {
    require("./sockets/" + file).listen(io);
});
