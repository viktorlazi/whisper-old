import express from 'express'
import cors from 'cors'

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(express.json())
app.use(cors())

// DB config
const connection_url = ''

// api routes
app.get('/', (req, res)=>res.status(200).send('hello world'))


// listen
app.listen(port, ()=>console.log(`Listening on localhost:${port}`))