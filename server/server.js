import * as io from "socket.io" 
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors'

const app = express();  
const server = createServer(app);  
app.use(cors())
const socketio = new io.Server(server);  

socketio.on('connection', (socket)=>{
  console.log('user connected')
})

server.listen(4000, ()=>{
  console.log('listening on 4000')
})

socketio.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  });
});