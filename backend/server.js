/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import http from 'http'
import path from 'path'
import express from 'express'
import socketIo from 'socket.io'

/*
-----------------------------------------------------------------------------------
|
| Server setup
|
-----------------------------------------------------------------------------------
*/

// Create server
const app = express()
const server = http.Server(app)
const io = socketIo(server)

// Start server
server.listen(3000, () => console.log('Server running..!'))

// Setup HTTP routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Setup websocket handling
io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
