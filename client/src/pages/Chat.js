import React, {useState, useEffect} from 'react'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  if(sessionStorage.getItem('user_token')){
    const socket = io('http://127.0.0.1:4000', {
    auth: {
      token:sessionStorage.getItem('user_token')
      }
    })  
    return (
      <div className="chat">
        <Sidebar socket={socket}/>
        <ChatBody socket={socket}/>
      </div>
    )
  }else{
    return(
      <div>Please log in</div>
    )
  }
}
