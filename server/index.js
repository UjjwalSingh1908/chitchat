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


const { addUser } = require('./helper')
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
            if(error)
        console.log('join error', error)
        else
        console.log('join user', user)
        })
        
    });

server.listen(PORT, () => {  
    console.log(`listening on port ${PORT} `);
});


