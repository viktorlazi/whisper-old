import React, {useState} from 'react'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  const [activeChat, setActiveChat]=useState();
  if(sessionStorage.getItem('user_token')){
    const socket = io('http://127.0.0.1:4000', {
    auth: {
      token:sessionStorage.getItem('user_token')
      }
    })  
    socket.on('contact approved', (contact)=>{
      setActiveChat(contact.name)
    })
    return (
      <div className="chat">
        <Sidebar socket={socket} activeChat={activeChat} changeActive={(name)=>setActiveChat(name)} />
        <ChatBody socket={socket} activeChat={activeChat}/>
      </div>
    )
  }else{
    return(
      <div>Please log in</div>
    )
  }
}
