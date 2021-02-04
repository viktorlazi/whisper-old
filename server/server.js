import * as io from "socket.io" 
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors'
import mongo_pass from './mongo_pass.js'
import mongoose from 'mongoose'
import {add_user} from './register.js'
import {login_user} from './login.js'

const app = express();  
const server = createServer(app); 
app.use(cors())
app.use(express.json())
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
  
})

socketio.on('connection', (socket) => {
  console.log('povezan')
  console.log(socket.handshake.auth.token)
  socket.on('chat message', (msg) => {
    console.log(msg)
  });
});

//post get
app.post('/api/register', async (req, res) =>{
  add_user(req.body).then(result=>res.send(result))
})

app.post('/api/login', async (req, res) =>{
  res.send(await login_user(req.body))
})

server.listen(4000, ()=>{
  
})
