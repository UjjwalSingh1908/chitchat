const express = require('express')();

const http = require('http');
const server = http.createServer(express);

const socketio = require("socket.io");
const io = socketio(http);
const PORT = process.env.port || 5000;

io.on('connection', (socket) => {  console.log('a user connected');});

server.listen(PORT, () => {  
    console.log(`listening on port ${PORT} `);
});