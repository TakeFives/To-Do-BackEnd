const express = require('express')
const jsonServer = require('json-server')
const authRouter = require('./authRouter')
const cors = require('cors')
const mongoose = require('mongoose')

const server = express()

server.use(cors())
server.use(express.json())
server.use('/auth', authRouter)
server.use(jsonServer.router('db.json'))

const PORT = process.env.PORT || 3030

const start = () => {
  try {
    mongoose.connect('mongodb+srv://User:user@cluster0.5uk6zxh.mongodb.net/?retryWrites=true&w=majority')
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
