import mongoose from 'mongoose'

const user_schema = new mongoose.Schema({
  username:String,
  password:String,
  contacts:[{type:String}]
})

export default mongoose.model('user', user_schema)