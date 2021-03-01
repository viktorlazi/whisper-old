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
import {sendContacts, sendMessages} from './fetch.js'
import Message from './models/Message.js'

const app = express();
const server = createServer(app);
app.use(cors())
app.use(express.json())
const socketio = new io.Server(server);

//mongo
const connection_url = "mongodb+srv://admin:" + mongo_pass + "@cluster0.lkgyy.mongodb.net/whisper?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser:true,
  useUnifiedTopology:true
})
const db = mongoose.connection; 
db.once('open', ()=>{
  console.log('db ok')
})

let clientConnections = []
let messages = [];

socketio.on('connection', async (socket) => {
  const clientToken = await token.findOne(
    {token:socket.handshake.auth.token}
    ).lean()
    if(clientToken){
      //from here it's ok to communicate with client
      const client = await User.findOne({'username':clientToken.for})
      
      socket.on('my public key', (pk)=>{
        clientConnections.push({username:client.username, id: socket, publicKey:pk})

      })
      socket.on('request public key', (username)=>{
        const bob = clientConnections.find(e=>e.username===username)
        if(bob){
          const bobsKey = bob.publicKey
          socket.emit('bobs public key', bobsKey, bob.username)
        }else{
          socket.emit('bobs public key', 'not online', username)
        }
      })
      
      // messages sockets
      socket.on('new message', (msg, to, timestamp)=>{
        const receiverSocket = clientConnections.find(e=>e.username===to);
        if(receiverSocket){
          receiverSocket.id.emit('incoming message', {msg:msg, from:client.username, timestamp:timestamp})
        }else{
          if(messages){
            messages = [...messages, {msg:msg, from: client.username, to:to, timestamp:timestamp}]
          }else{
            messages = [{msg:msg, from: client.username, to:to, timestamp:timestamp}]
          }
        }
      })
      socket.on('disconnect', ()=>{
        clientConnections = clientConnections.filter(e=>{
          return e.username!==client.username
        })
        if(messages){ // only save to db if socket isnt alive
          messages.forEach(e => {
            Message.create({
              message:e.msg,
              from:e.from,
              to:e.to,
              timestamp:e.timestamp
            })
          });
          messages = null
        }
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
app.post('/api/get_messages', async(req, res) =>{
  res.send(await sendMessages(req.body.token))
})
app.get('/api/logout_everyone', async (req, res)=>{
  token.deleteMany().exec().then(()=>{
    socketio.emit('not logged in')
  })
  res.sendStatus(200)
})
app.get('/api/delete_all_accounts', async (req, res)=>{
  User.deleteMany().exec();
  token.deleteMany().exec().then(()=>{
    socketio.emit('not logged in')
  })
  res.sendStatus(200)
})

server.listen(4000)
