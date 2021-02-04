import User from './models/user_schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'WZZWZEklsdjf293e098r**?2--sdfwefewmlfkwef2l3krnfs lefkjwefekjwelfj777244$-_4'

export const login_user = async(body)=>{
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

    return {status:'ok', data:token}
  }
  return {status:'error', error:'invalid username/password'}
}