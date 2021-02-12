import mongoose from "mongoose";
import LoginToken from './models/LoginToken.js'
import User from "./models/User.js";

export const sendContacts = async (token) =>{
  const clientToken = await LoginToken.findOne(
    {token:token}
  )
  if(clientToken){
    return (await User.findOne({username:clientToken.for}).exec()).contacts
  }
}