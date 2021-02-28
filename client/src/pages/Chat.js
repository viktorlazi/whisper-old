import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'
import * as bigInt from 'big-integer'
import bigPrime from './bigprime.js'


export default function Chat() {
  const [activeChat, setActiveChat]=useState()
  const [contacts, setContacts]=useState([])

  const [encryptionKey, setEncryptionKey]=useState({})
  const [sharedSecrets, setSharedSecrets]=useState([])
  const [socket, setSocket]=useState(io)
  socket.removeAllListeners()
  const history = useHistory()

  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    if(sessionStorage.getItem('user_token')){
      setSocket(io('http://127.0.0.1:4000', {
        auth: {
          token:sessionStorage.getItem('user_token')
          }
        })
      )      
      fetch("http://localhost:4000/api/get_contacts",{
        method: 'POST',
        body:JSON.stringify({
          token:sessionStorage.getItem('user_token')
        }),
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then(res=>res.json())
      .then(res=>{
        setContacts(res)
      })
    }
    
  }, [])

  useEffect(async () => {
    await delay(500)
    const prKey = generatePrivateKey()
    const pubKey = generatePublicKey(prKey)
    setEncryptionKey({
      private: prKey,
      public: pubKey
    })
    console.log(encryptionKey)
    socket.emit('my public key', pubKey)
  }, [socket])

  const generatePrivateKey = () =>{
    const rnd = (Math.random() * 1000 + 1)
    const rndInt = Math.floor(rnd)
    return rndInt
  }
  const generatePublicKey = (prKey) =>{
    const _prKey = bigInt(prKey)
    const generator = bigInt(2)
    const prime = bigInt('0x' + bigPrime)
    const pubKey = generator.modPow(_prKey, prime)
    return pubKey
  } 

  const createSharedSecret = (prKey, pubKey) =>{
    const _prKey = bigInt(prKey)
    const _pubKey = bigInt(pubKey)
    const prime = bigInt('0x' + bigPrime)
    const secret = _pubKey.modPow(_prKey, prime)
    alert(secret)
    return secret
  }

  useEffect(() => {
    if(activeChat){
      socket.emit('request public key', activeChat)
    }
  }, [activeChat])
  
  socket.on('bobs public key', (key, username)=>{
    // key is contacts public key
    setSharedSecrets(sharedSecrets=>[...sharedSecrets, {
      username:username,
      secret:createSharedSecret(encryptionKey.private, key)
    }])
  })


  if(sessionStorage.getItem('user_token')){
    socket.on('not logged in', ()=>{
      sessionStorage.clear()
      history.push('/login')
    })
    return (
      <div className="chat">
        <Sidebar 
          socket={socket} 
          activeChat={activeChat} 
          changeActive={(name)=>setActiveChat(name)}
          contacts={contacts}
          setContacts={setContacts}/>
        <ChatBody 
          socket={socket} 
          activeChat={activeChat}
          closeChat={()=>{setActiveChat(null)}}
          contacts={contacts}
          setContacts={setContacts}/>
      </div>
    )
  }else{
    history.push('/login')
    return(
      <div>Please log in</div>
    )
  }
}