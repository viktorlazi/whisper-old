import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import BlockIcon from '@material-ui/icons/Block';
import './chatBody.css'
import Message from './Message'
import NoChat from './NoChat'

function ChatBody({socket, activeChat, contacts, setContacts, closeChat}) {
  const [messages, setMessages] = useState([])
  const[input, setInput] = useState("")

  const addMessageToState = (msg, sender, receiver, timestamp) =>{
    setMessages(
      [...messages,  { 
        msg:msg,
        sender:sender,
        receiver:receiver,
        timestamp:timestamp
      }],
    )
  }
  const sendMessage = async(e)=>{
    e.preventDefault();
    if(input !== ""){
      let now = new Date().getHours().toString() + ":"
        + new Date().getMinutes().toString();
      addMessageToState(input, sessionStorage.getItem('username'), activeChat, now)
      socket.emit('new message', input, activeChat, now)
      setInput("")
    }
  }
  const burnContact = () =>{
    socket.emit('burn contact', activeChat)
    closeChat()
    setContacts(contacts=>contacts.filter(e=>{
      return e.name!==activeChat
    }))
  }
  const blockContact = () =>{
    socket.emit('block contact', activeChat)
  }
  
  socket.on('incoming message', (message)=>{
    addMessageToState(message.msg, message.from, sessionStorage.getItem('username'), message.timestamp)
  })

  useEffect(() => {
    fetch("http://localhost:4000/api/get_messages",{
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
        res.map(msg=>{
          addMessageToState(msg.message, msg.from, msg.to, msg.timestamp)
          return null;
        })
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
            <IconButton onClick={blockContact}>
              <BlockIcon/>
            </IconButton>
          </div>
        </div>
        <div className="chat_meat">
          {
            messages.map(
              (obj) =>{
                return <Message 
                  message={obj.msg}
                  timestamp={obj.timestamp}
                  sender={obj.receiver === activeChat || obj.sender === activeChat}
                  receiver={obj.receiver !== sessionStorage.getItem('username')}/>
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
