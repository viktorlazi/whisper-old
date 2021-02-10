import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  const [activeChat, setActiveChat]=useState()
  const history = useHistory();

  if(sessionStorage.getItem('user_token')){
    const socket = io('http://127.0.0.1:4000', {
    auth: {
      token:sessionStorage.getItem('user_token')
      }
    })
    socket.on('not logged in', ()=>{
      sessionStorage.clear()
      history.push('/login')
    })
    return (
      <div className="chat">
        <Sidebar 
          socket={socket} 
          activeChat={activeChat} 
          changeActive={(name)=>setActiveChat(name)}/>
        <ChatBody 
          socket={socket} 
          activeChat={activeChat}/>
      </div>
    )
  }else{
    return(
      <div>Please log in</div>
    )
  }
}
