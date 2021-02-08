import * as io from "socket.io" 
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors'
import mongo_pass from './mongo_pass.js'
import mongoose from 'mongoose'
import {add_user} from './register.js'
import {login_user, logout_user} from './login.js'
import token from './models/LoginToken.js'
import User from './models/User.js'

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
  console.log('db connected')
})

socketio.on('connection', async (socket) => {
  const callerToken = (await token.findOne(
    {token:socket.handshake.auth.token}
  ).lean())
  if(callerToken){
    const caller = await User.findOne({'username':callerToken.for})
    //from here it's ok to communicate with client
    

    socket.on('new contact', async (new_contact) => {
      const details = await User.findOne({'username':new_contact})
      if(details){
        User.updateOne({_id:caller._id}, {
          contacts:[...caller.contacts, {name:details.username, last:'Say hello...'}]
        }).exec()
        socket.emit('contact approved', {name:details.username, last:'Say hello...'})
      }else{
        socket.emit('contact nonexistent')
      }
    });
  }
});

//post get
app.post('/api/register', async (req, res) =>{
  add_user(req.body).then(result=>res.send(result))
})
app.post('/api/login', async (req, res) =>{
  res.send(await login_user(req.body))
})
app.post('/api/logout', async (req, res) =>{
  res.send(await logout_user(req.body))
})

server.listen(4000, ()=>{
  
})
