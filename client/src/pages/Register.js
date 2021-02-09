import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './login.css'

export default function Register() {
  const history = useHistory();
  const[username, setUsername]=useState('')
  const[password, setPassword]=useState('')
  const[repeatPassword, setRepeatPassword]=useState('')
  const[errorMessage, setErrorMessage]=useState('')

  const tryRegister = (e)=>{
    e.preventDefault();
    if(password !== repeatPassword){
      setErrorMessage('passwords don\'t match')
    }else if(password.length < 8){
      setErrorMessage('password shorter than 8 characters')
    }else{
      fetch("http://localhost:4000/api/register",{
        method: 'POST',
        body:JSON.stringify({
          username:username,
          password:password
        }),
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(
        result => {
          if(result.status === 'ok'){
            alert('username registered -> you can login now')
            history.push('/login')
          }else{
            setErrorMessage(result.error)
          }
        }
      )
      .catch(err => console.log(err))
    }
  }
  
  return (
    <div className="login">
      <form method="post" action="http://localhost:4000/api/register">
        <h1>Register</h1>
        <p>username:</p>
        <input value={username} onChange={e=>setUsername(e.target.value)} type="text" />
        <p>password:</p>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
        <p>repeat password:</p>
        <input value={repeatPassword} onChange={e=>setRepeatPassword(e.target.value)} type="password" />
        <button onClick={tryRegister}>Submit</button>
        <p id="errorMessage">{errorMessage}</p>
      </form>
    </div>
  )
}
