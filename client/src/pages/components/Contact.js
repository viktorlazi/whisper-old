import { Avatar } from '@material-ui/core'
import React from 'react'
import './contact.css'

function Contact({name}) {
  return (
    <div className="contact">
      <div className="contact_left">
        <h2>{name}</h2>
        <p>{}</p>
      </div>
      <Avatar/>
    </div>
  )
}

export default Contact
