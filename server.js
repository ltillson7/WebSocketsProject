const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('start_Game',function(gamePlayer){
        console.log('Welcome: ' + gamePlayer);
        io.emit('start_Game', gamePlayer);
    });

    socket.on('play',function(move){
        console.log('Move played' + move);
        io.emit('play', move);
    });

    socket.on('leave_Game', function(gamePlayer){
        console.log(gamePlayer + ' disconnected');
        io.emit('leave_Game', gamePlayer);
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('Waiting for Players');
});