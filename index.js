// Node Modules
const express = require('express');
const http = require('http');
const io = require('socket.io');


// Setup the port that the server will listen to.
const SERVER_PORT = process.env.PORT || 5000;



// Creates working constants
const app = express();
const server = http.Server(app);
const serverSocket = io(server);


app.use(express.static('public'));


app.get("/",(req,res) => {
    res.sendFile(__dirname+"/public/index.html");
});


// Initiates the server.
server.listen(SERVER_PORT, () => {
    console.log(`Server listening at port ${SERVER_PORT}`);
});


serverSocket.on('connection', (socket) => {
    
    console.log('a user has connected')

    socket.on('new message', (message) => {
        console.log('new message', message);
        socket.emit('incomingMessage', message);
        socket.broadcast.emit('incomingMessage', message);
    });

});