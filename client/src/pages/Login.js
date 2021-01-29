import React from 'react'
import './login.css'

export default function Login() {
  return (
    <div className="login">
      <form>
        <h1>Login please</h1>
        <p>username:</p>
        <input type="text"></input>
        <p>password:</p>
        <input type="password"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}
