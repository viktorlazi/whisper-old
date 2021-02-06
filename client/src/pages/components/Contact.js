import { Avatar } from '@material-ui/core'
import React from 'react'
import './contact.css'

function Contact({contacts, active, activate}) {
  return (
    <div onClick={()=>{activate(contacts.name)}} className={`contact ${active?" active":""}`}>
      <div className="contact_left">
        <h4>{contacts.name}</h4>
        <p>{contacts.last}</p>
      </div>
      <Avatar/>
    </div>
  )
}

export default Contact
