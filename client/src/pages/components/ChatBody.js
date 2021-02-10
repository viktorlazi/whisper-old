
import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import BlockIcon from '@material-ui/icons/Block';
import './chatBody.css'
import Message from './Message'
import NoChat from './NoChat'

function ChatBody({socket, activeChat}) {
  const [messages, setMessages] = useState([])
  const[input, setInput] = useState("")

  const addMessageToState = (msg, time, receiver) =>{
    setMessages([...messages, {
      message:msg,
      timestamp:time,
      receiver:receiver
    }])
  }
  const sendMessage = async(e)=>{
    e.preventDefault();
    if(input !== ""){
      addMessageToState(input, 'now', true)
      socket.emit('chat message', input)
      setInput("")
    }
  }
  const burnContact = () =>{
    socket.emit('burn contact', activeChat)
  }
  if(activeChat){
    return (
      <div className="chat_body">
        <div className="chat_header">
          <div className="chat_headerInfo">
            <Avatar />
            <h2>{activeChat}</h2>
          </div>
          <div className="chat_headerRight">
            <IconButton onClick={burnContact}>
              <WhatshotIcon/>
            </IconButton>
            <IconButton>
              <BlockIcon/>
            </IconButton>
          </div>
        </div>
        <div className="chat_meat">
          {
            messages.map(
              (msg) =>{
                return <Message 
                  message={msg.message}
                  timestamp={msg.timestamp}
                  receiver={msg.receiver}/>
              }
            )
          }
        </div>
        
        <div className="chat_footer">
          <form>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" type="text" />
            <button onClick={sendMessage}>Send a message</button>
          </form>
        </div>
      </div>
    )
  }
  return(<NoChat/>)
}

export default ChatBody
