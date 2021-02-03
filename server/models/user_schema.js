import mongoose from 'mongoose'

const user_schema = new mongoose.Schema({
  username:String,
  password:String
})

export default mongoose.model('user', user_schema)