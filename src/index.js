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

// emit data from server to client 
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', welcomeMessage)
    socket.broadcast.emit('message', 'A new user has joined the chat!')

    socket.on('sendChatMessage', (chatMessage) => {
        io.emit('message', chatMessage)
    })

    socket.on('shareLocation', (locationCoordinates) => {
        io.emit('message', `https://google.com/maps?q=${locationCoordinates.latitude},${locationCoordinates.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat!')
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port + '!')
})