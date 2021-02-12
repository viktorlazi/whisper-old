import React from 'react'

function Message({message, receiver, sender, timestamp}) {
  if(sender){
    return (
      <p className={`chat_message ${receiver && 'chat_receiver'}`}>
        {message}
        <span className="chat_timestamp">
          {timestamp}
        </span>
      </p>
    )
  }
  return null
}

export default Message
