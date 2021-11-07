const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');


const mongoDB =  "mongodb+srv://ujjwal:Ujjwal%401234@cluster0.s9kt7.mongodb.net/chat-database?retryWrites=true&w=majority"
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('db connected bro!')).catch(err=>console.log(err));

const socketio = require("socket.io");
const io = socketio(server);

const PORT = process.env.port || 5000;

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

const Room = require('./models/Room');
const Message = require('./models/Message');


const { addUser, getUser, removeUser } = require('./helper');
const { Socket } = require('dgram');
io.on('connection', (socket) => {
      console.log(socket.id);
      Room.find().then(result=> {
        //   console.log('output-rooms', result);
          socket.emit('output-rooms',result);
      })
        socket.on('create-room', name => {
        
            // console.log('the room name is ', name);
            const room = new Room({name});
            room.save().then(result=> {
                io.emit('room-created', result)
            })
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
            // console.log('msg', msgToStore);
            const msg = new Message(msgToStore);
            msg.save().then(result=> {
                io.to(room_id).emit('message', result);
            callback()
            })
            
        });
        socket.on('disconnect',()=> {
            const user = removeUser(socket.id)
        })
        
    });

server.listen(PORT, () => {  
    console.log(`listening on port ${PORT} `);
});


