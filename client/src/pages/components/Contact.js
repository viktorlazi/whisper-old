import { Avatar } from '@material-ui/core'
import React from 'react'
import './contact.css'

function Contact({contacts}) {
  return (
    <div className="contact">
      <div className="contact_left">
        <h2>{contacts.name}</h2>
        <p>{contacts.last}</p>
      </div>
      <Avatar/>
    </div>
  )
}

export default Contact
