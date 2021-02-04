import mongoose from 'mongoose'
import User from './models/user_schema.js'
import bcrypt from 'bcrypt'

export const add_user = async(body)=>{
  if(await User.findOne({'username':body.username}, (err,data)=>{})){
    return 'username exists'
  }else{
    const hashedPassword = await bcrypt.hash(body.password, 10)
    User.create({
      "username":body.username,
      "password":hashedPassword
    })
    return 'succesful'
  }
}

