import * as io from "socket.io" 
import express from 'express'; 
import {createServer} from 'http'; 

const app = express();  
const server = createServer(app);  
const socketio = new io.Server(server);  

socketio.on('connection', (socket)=>{
  console.log('user connected')
})

server.listen(4000, ()=>{
  console.log('listening on 4000')
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  });
});