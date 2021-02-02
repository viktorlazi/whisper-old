import * as io from "socket.io" 
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors'
import mongo_pass from './mongo_pass.js'
import mongodb from 'mongodb'
import mongoose from 'mongoose'

const app = express();  
const server = createServer(app); 
app.use(cors())
const socketio = new io.Server(server);  

//mongo
const connection_url = "mongodb+srv://admin:"+ mongo_pass +"@cluster0.lkgyy.mongodb.net/whisper?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser:true,
  useUnifiedTopology:true
})
const db = mongoose.connection;
db.once('open', ()=>{
  console.log('succesful db connection')
  /* database stuff */
})

socketio.on('connection', (socket)=>{
  console.log('user connected')
})

server.listen(4000, ()=>{
  console.log('listening on 4000')
})

socketio.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg)
  });
});

