import React from 'react'

function Message({message, receiver, timestamp}) {
  return (
    <p className={`chat_message ${receiver && 'chat_receiver'}`}>
      {message}
      <span className="chat_timestamp">
        {timestamp}
      </span>
    </p>
  )
}

export default Message
