import React, {useState, useEffect} from 'react'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  const [addressToken, setAdressToken] = useState(1)
  useEffect(() => {
    setAdressToken(localStorage.getItem('user_token'))
  }, [])
  const socket = io('http://localhost:4000', {
    auth: {
      token:1
    }
  })  
  if(addressToken){
    return (
      <div className="chat">
        <Sidebar addressToken={addressToken} socket={socket}/>
        <ChatBody addressToken={addressToken} socket={socket}/>
      </div>
    )
  }
  return(
    <div>Please log in</div>
  )
}
