const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);

const PORT = process.env.port || 5000;

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));


const { addUser, getUser, removeUser } = require('./helper');
const { Socket } = require('dgram');
io.on('connection', (socket) => {
      console.log(socket.id);
        socket.on('create-room', name => {
        
            console.log('the room name is ', name);
        })
        socket.on('join', ({name, room_id, user_id}) => {
            const {error, user} = addUser({
                socket_id: socket.id,
                name,
                room_id,
                user_id,
            })
            socket.join(room_id);
            if(error)
        console.log('join error', error)
        else
        console.log('join user', user)
        })
        socket.on('sendMessage', (message, room_id, callback)=>{
            const user = getUser(socket.id);
            const msgToStore={
                name: user.name,
                user_id: user.user_id,
                room_id,
                text: message
            }
            console.log('msg', msgToStore);
            io.to(room_id).emit('message', msgToStore);
            callback()
        });
        socket.on('disconnect',()=> {
            const user = removeUser(socket.id)
        })
        
    });

server.listen(PORT, () => {  
    console.log(`listening on port ${PORT} `);
});


