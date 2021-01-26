import { Avatar } from '@material-ui/core'
import React from 'react'
import './contact.css'

function Contact() {
  return (
    <div className="contact">
      <div className="contact_left">
        <h2>Ime</h2>
        <p>zadnja poruka...</p>
      </div>
      <Avatar/>
    </div>
  )
}

export default Contact
