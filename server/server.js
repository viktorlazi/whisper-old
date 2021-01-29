import * as io from "socket.io" 
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors'
import mongo_pass from './mongo_pass.js'
import mongodb from 'mongodb'

const app = express();  
const server = createServer(app); 
app.use(cors())
const socketio = new io.Server(server);  

//mongo
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://admin:"+ mongo_pass +"@cluster0.lkgyy.mongodb.net/whisper?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology:true});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});

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