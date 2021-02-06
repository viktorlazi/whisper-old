import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Contact from './Contact'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core'
import './sidebar.css'

function Sidebar({socket}) {
  const [contacts, set_contacts] = useState();
  const [newContact, setNewContact] = useState();
  const history = useHistory();
  const logout = async (e)=>{
    e.preventDefault()
    await fetch("http://localhost:4000/api/logout",{
      method: 'POST',
      body:JSON.stringify({
        token:sessionStorage.getItem('user_token')
      }),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .catch(err => console.log(err))
    history.push('/login')
  }
  const addContact = (e) =>{
    e.preventDefault()
    setNewContact('')
    socket.emit('new contact', newContact)
  }
  useEffect(() => {
    socket.on('contact approved', contactDetails=>{
      alert(contactDetails)
    })
  }, [socket])
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar/>
        <div className="sidebar_headerRight">
          <IconButton>
            <WhatshotIcon/>
          </IconButton>
          <IconButton>
              <MoreVertIcon/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_chats">
        <Contact/>
      </div>
      <form className="sidebar_add_new">
        <p>+Add new</p>
        <input value={newContact} onChange={e=>setNewContact(e.target.value)} type="text"></input>
        <p id="addContactMessage"></p>
        <button id="addContact" type="submit" onClick={addContact}></button>
      </form>
      <div class="sidebar_logout">
        <button id="logout" type="submit" onClick={logout}>Log out</button>
      </div>
    </div>
  )
}

export default Sidebar
