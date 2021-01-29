import React from 'react'

export default function Register() {
  return (
    <div className="login">
      <form>
        <h1>Register please</h1>
        <p>username:</p>
        <input type="text"></input>
        <p>password:</p>
        <input type="password"></input>
        <p>repeat password:</p>
        <input type="password"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}
