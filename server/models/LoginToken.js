import mongoose from 'mongoose'

const login_token_schema = new mongoose.Schema({
  token:String
})

export default mongoose.model('login_token', login_token_schema)