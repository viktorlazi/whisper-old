
import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import BlockIcon from '@material-ui/icons/Block';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './chatBody.css'
import Message from './Message'

function ChatBody({addressToken, socket}) {
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
  
  useEffect(() => {
    socket.on("chat message", msg => {
      alert(msg)
    });
  }, [socket]);

  return (
    <div className="chat_body">
      <div className="chat_header">
        <div className="chat_headerInfo">
          <h3>username</h3>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <WhatshotIcon/>
          </IconButton>
          <IconButton>
            <BlockIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
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

export default ChatBody
