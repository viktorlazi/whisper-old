import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  const [activeChat, setActiveChat]=useState()
  const [contacts, setContacts]=useState([])
  const [messages, setMessages]=useState([])
  const [socket, setSocket]=useState(io)
  socket.removeAllListeners()
  const history = useHistory()

  useEffect(() => {
    if(sessionStorage.getItem('user_token')){
      setSocket(io('http://127.0.0.1:4000', {
        auth: {
          token:sessionStorage.getItem('user_token')
          }
        })
      )
      fetch("http://localhost:4000/api/get_contacts",{
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
        setContacts(res)
      })
    }
  }, [])

  if(sessionStorage.getItem('user_token')){
    

    socket.on('not logged in', ()=>{
      sessionStorage.clear()
      history.push('/login')
    })

    return (
      <div className="chat">
        <Sidebar 
          socket={socket} 
          activeChat={activeChat} 
          changeActive={(name)=>setActiveChat(name)}
          contacts={contacts}
          setContacts={setContacts}/>
        <ChatBody 
          socket={socket} 
          activeChat={activeChat}
          closeChat={()=>{setActiveChat(null)}}
          contacts={contacts}
          setContacts={setContacts}/>
      </div>
    )
  }else{
    history.push('/login')
    return(
      <div>Please log in</div>
    )
  }
}
