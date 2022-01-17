const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000 
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

const welcomeMessage = 'Welcome to the chat app!'

// emit data (welcomeMessage) from server to client 
// emit data (sendChatMessage) from client to server 
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', welcomeMessage)

    socket.on('sendChatMessage', (chatMessage) => {
        io.emit('message', chatMessage)
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port + '!')
})