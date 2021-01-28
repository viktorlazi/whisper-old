import React from 'react'
import Contact from './Contact'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core'
import {SearchOutlined} from "@material-ui/icons"
import './sidebar.css'


function Sidebar() {
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
        <Contact/>
        <Contact/>
        <Contact/>
        <Contact/>
        <Contact/>
      </div>
      <div className="sidebar_add_new">
        <p>+Add new</p>
        <input type="text"></input>
        <button type="submit"></button>
      </div>
    </div>
  )
}

export default Sidebar
