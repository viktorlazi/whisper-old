import React from 'react'

export default function Register() {
  return (
    <div className="login">
      <form method="post" action="http://localhost:4000/api/register">
        <h1>Register please</h1>
        <p>username:</p>
        <input type="text" name="username"></input>
        <p>password:</p>
        <input type="password" name="password"></input>
        <p>repeat password:</p>
        <input type="password"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}
