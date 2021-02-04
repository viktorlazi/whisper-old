import React, {useEffect, useState} from 'react'
import './login.css'

export default function Login() {
  const[username, setUsername]=useState('')
  const[password, setPassword]=useState('')
  const[errorMessage, setErrorMessage]=useState('')
  const tryLogin = async(e)=>{
    e.preventDefault()
    setPassword('')
    await fetch("http://localhost:4000/api/login",{
      method: 'POST',
      body:JSON.stringify({
        username:username,
        password:password
      }),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(response => response.text())
    .then(
      result => {
        sessionStorage.setItem('user_token', result.token)
        console.log(result)
      }
    )
    .catch(err => console.log(err))}


  return (
    <div className="login">
      <form>
        <h1>Login please</h1>
        <p>username:</p>
        <input value={username} onChange={e=>setUsername(e.target.value)} type="text" />
        <p>password:</p>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="text" />
        <button onClick={tryLogin}>Submit</button>
        <p id="errorMessage">{errorMessage}</p>
      </form>
    </div>
  )
}
