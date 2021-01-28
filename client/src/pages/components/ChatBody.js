<<<<<<< HEAD
import React, {useState} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BlockIcon from '@material-ui/icons/Block';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './chatBody.css'
import Message from './Message'

function ChatBody({messages}) {
  const[input, setInput] = useState("")
  const sendMessage = async(e)=>{
    e.preventDefault();
    //axios
    setInput("")
  }
=======
import React from 'react'
>>>>>>> parent of 5da858f... chat presentable

  return (
    <div className="chat_body">
<<<<<<< HEAD
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
        <Message message="krac" timestamp="10:20" receiver={true}/>
        <Message message="krac" timestamp="10:20" receiver={false}/>
      </div>
      
      <div className="chat_footer">
        <form>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage}>Send a message</button>
        </form>
      </div>
=======
      
>>>>>>> parent of 5da858f... chat presentable
    </div>
  )
}

export default ChatBody
