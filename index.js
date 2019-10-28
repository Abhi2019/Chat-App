const  app = require('express')();
const http = require('http').createServer(app);
const  portfinder = require('portfinder'); 
const io = require('socket.io')(http);
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
});

portfinder.getPortPromise()
    .then((port) => {
        http.listen(port, () => {
            console.log('listening on *:', port);
        });
    })
    .catch((err) => {
        console.log("Not able to find the port", err);
    });
