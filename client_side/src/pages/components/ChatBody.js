import React from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BlockIcon from '@material-ui/icons/Block';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './chatBody.css'

function ChatBody() {
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
        <p className="chat_message">
          <span className="chat_name">
          Name
          </span>
          Message
          <span className="chat_timestamp">
          timestamp
          </span>
        </p>
      </div>
      <div className="chat_footer">
        <form>
          <input placeholder="Type a message" type="text" />
          <button>Send a message</button>
        </form>
      </div>
    </div>
  )
}

export default ChatBody
