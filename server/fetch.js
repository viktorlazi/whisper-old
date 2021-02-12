import LoginToken from './models/LoginToken.js'
import User from "./models/User.js";
import Messages from './models/Message.js'

export const sendContacts = async (token) =>{
  const clientToken = await LoginToken.findOne(
    {token:token}
  )
  if(clientToken){
    return (await User.findOne({username:clientToken.for}).exec()).contacts
  }
}
export const sendMessages = async (token) =>{
  const clientToken = await LoginToken.findOne(
    {token:token}
  )
  if(clientToken){
    const unreadMessages = await Messages.find({
      to:clientToken.for
    })
    if(unreadMessages){
      console.log(unreadMessages)
      Messages.deleteMany({
        to:clientToken.for
      }).exec()
      return unreadMessages
    }
    return []
  }
}