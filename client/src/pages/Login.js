import React, {useEffect, useState} from 'react'
import './login.css'

export default function Login() {
  const[username, setUsername]=useState('')
  const[password, setPassword]=useState('')
  const[errorMessage, setErrorMessage]=useState('')
  const tryLogin = async(e)=>{
    e.preventDefault();
    setPassword('');
    setErrorMessage('asd')
  }  
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
