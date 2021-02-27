import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  const [activeChat, setActiveChat]=useState()
  const [contacts, setContacts]=useState([])
  const [encryptionKeys, setEncryptionKeys]=useState([])
  const [socket, setSocket]=useState(io)
  socket.removeAllListeners()
  
  const history = useHistory()

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


  const generatePrivateKey = () =>{
    const rnd = (Math.random() * 10 + 1)
    const rndInt = Math.floor(rnd)
    return rndInt
  }
  const generatePublicKey = (prKey) =>{
    const exp = Math.pow(2, prKey)
    const mod = exp%13;
    return mod
  }
  const createSharedSecret = (prKey, pubKey) =>{

  }
  const newEncryptionKeys = (username)=>{
    if(encryptionKeys.length > 0){
      if(encryptionKeys.map(e=>{
        return e.username===username
      }).length > 0){
        return false
      }
    }
    const prKey = 1; //
    const pubKey = 2; //

    return {
      prKey, pubKey, username
    }
  }

  useEffect(() => {
    if(activeChat){
      const newKeys = newEncryptionKeys(activeChat);
      if(newKeys){
        socket.emit('public_key', newKeys.pubKey, activeChat)
        setEncryptionKeys(encryptionKeys=>[...encryptionKeys, newKeys]) 
      }
    }
  }, [activeChat])

  socket.on('public key request', (username, pubKey)=>{
    const newKeys = newEncryptionKeys(username);
    socket.emit('shared secret accomplished', newKeys.pubKey, username)
    setEncryptionKeys(encryptionKeys=>[...encryptionKeys, newKeys]) 
    const bobsKey = encryptionKeys.find(e=>e.username===username)
    const sharedSecret = createSharedSecret(bobsKey.prKey, bobsKey.pubKey)
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
