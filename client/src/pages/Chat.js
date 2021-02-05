import React, {useState, useEffect} from 'react'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  useEffect(() => {
    console.log(sessionStorage.getItem('user_token'))
  }, [])
  const socket = io('http://localhost:4000', {
    auth: {
      token:1
    }
  })  
  if(sessionStorage.getItem('user_token')){
    return (
      <div className="chat">
        <Sidebar addressToken={sessionStorage.getItem('user_token')} socket={socket}/>
        <ChatBody addressToken={sessionStorage.getItem('user_token')} socket={socket}/>
      </div>
    )
  }
  return(
    <div>Please log in</div>
  )
}
