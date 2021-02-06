import mongoose from 'mongoose'

const message_schema = new mongoose.Schema({
  message:String,
  from:String,
  to:String,
  timestamp:String
})

export default mongoose.model('message', message_schema)