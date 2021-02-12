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
import {sendContacts} from './fetch.js'

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

//client connections
let clientConnections = []

socketio.on('connection', async (socket) => {
  console.log('connect')
  const clientToken = await token.findOne(
    {token:socket.handshake.auth.token}
  ).lean()
  if(clientToken){
    //from here it's ok to communicate with client
    let messages = [];
    const client = await User.findOne({'username':clientToken.for})
    clientConnections.push(client.username)
    console.log(clientConnections)

    // messages sockets
    socket.on('new message', (msg, to, timestamp)=>{
      messages = [...messages, {msg, to, timestamp}]
      
    })
    socket.on('disconnect', ()=>{
      clientConnections = clientConnections.filter(e=>{
        return e!==client.username
      })
      console.log(clientConnections)
      //send to db
    })

    // contact sockets
    socket.on('block contact', (contact)=>{
      if(!client.blocked.find(e=>e.name===contact)){
        User.updateOne({_id:client._id}, {
          blocked:[...client.blocked, contact]
        }).exec()
      }
    })
    socket.on('new contact', async (new_contact) => {
      const details = await User.findOne({'username':new_contact})
      if(details){
        if(!client.contacts.find(e=>e.name===new_contact)){
          User.updateOne({_id:client._id}, {
            contacts:[...client.contacts, {name:details.username, last:'Say hello...'}]
          }).exec()
        }
        socket.emit('contact approved', {name:details.username, last:'Say hello...'})
      }
      else{
        socket.emit('contact nonexistent')
      }
    }
    );
    socket.on('burn contact', async (username) => {
      User.updateOne({_id:client._id}, {
        contacts:client.contacts.filter(e=>{
          return e.name!=username
        })
      }).exec()
    })
  }else{
    socket.emit('not logged in')
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
app.post('/api/get_contacts', async(req, res) =>{
  res.send(await sendContacts(req.body.token))
})

app.get('/api/logout_everyone', async (req, res)=>{
  token.deleteMany().then(()=>{
    socketio.emit('not logged in')
  })
  res.sendStatus(200)
})
server.listen(4000, ()=>{
  
})
