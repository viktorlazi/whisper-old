import * as io from "socket.io" 
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors'
import mongo_pass from './mongo_pass.js'
import mongoose from 'mongoose'
import message_schema from './models/message_schema.js'
import user_schema from './models/user_schema.js'

import bcrypt from 'bcrypt'

const app = express();  
const server = createServer(app); 
app.use(cors())
app.use(express.json())
const socketio = new io.Server(server);  

app.post('/api/register', async (req, res) =>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    user_schema.create({
      username: req.body.username,
      password: hashedPassword
    }, (err, data) =>{
      if(err){
        res.status(500).send(err)
      }else{
        res.status(201).send(data)
      }
    })
  }catch{

  }
})

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
})

socketio.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg)
  });
});


server.listen(4000, ()=>{
  console.log('listening on 4000')
})
