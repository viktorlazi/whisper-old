import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Contact from './Contact'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core'
import './sidebar.css'

function Sidebar({socket}) {
  const [contacts, setContacts] = useState();
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
      <div className="sidebar_add_new">
        <p>+Add new</p>
        <input type="text"></input>
        <button type="submit"></button>
      </div>
      <div>
        <button type="submit" onClick={logout}>Log out</button>
      </div>
    </div>
  )
}

export default Sidebar
