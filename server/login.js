import User from './models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import LoginToken from './models/LoginToken.js'

const JWT_SECRET = 'WZZWZEklsdjf293e098r**?2--sdfwefewmlfkwef2l3krnfs lefkjwefekjwelfj777244$-_4'

export const login_user = async(body)=>{
  const user_token = await LoginToken.findOne({"for":body.username})
  if(user_token){
    return {status:'error', error:'already logged in'}
  }
  const user = await User.findOne({"username":body.username})
  if(!user){
    return {status:'error', error:'invalid username/password'}
  }
  if(await bcrypt.compare(body.password, user.password)){
    const token = jwt.sign(
      {
        id:user._id, 
        username:user.username
      },
      JWT_SECRET
    )
    LoginToken.create({
      token:token,
      for:body.username
    })
    console.log([...user.contacts])
    return {status:'ok', token:token, contacts:[...user.contacts]}
  }
  return {status:'error', error:'invalid username/password'}
}

export const logout_user = async(body)=>{
  LoginToken.deleteOne({'token':body.token}).exec()
  .then(
    ()=> {return {status:'ok'}}
  ).catch(
    ()=>{
      return {status:'error', error:'not even logged in'}
    }
  )

}