import React, {useState} from 'react'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

export default function Chat() {
  const [addressToken, setAdressToken] = useState(1)

  if(addressToken){
    return (
      <div className="chat">
        <Sidebar addressToken={addressToken}/>
        <ChatBody addressToken={addressToken}/>
      </div>
    )
  }
  return(
    <div>Please log in</div>
  )
}
