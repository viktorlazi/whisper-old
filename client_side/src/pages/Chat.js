import React, {useState} from 'react'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'

export default function Chat() {
  const [addressToken, setAdressToken] = useState(1)

  if(addressToken){
    return (
      <div className="chat">
        <Sidebar/>
        <ChatBody/>
      </div>
    )
  }
  return(
    <div>Please log in</div>
  )
}
