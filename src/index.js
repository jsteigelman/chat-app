const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

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

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined the chat!'))

    socket.on('sendChatMessage', (chatMessage, callback) => {
        const filter = new Filter()
        
        // prevent message from sending due to profanity
        if (filter.isProfane(chatMessage)) {
            return callback('Profanity is not allowed in the chat.')
        }

        io.emit('message', generateMessage(chatMessage))
        callback()
    })

    socket.on('shareLocation', (locationCoordinates, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${locationCoordinates.latitude},${locationCoordinates.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left the chat!'))
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port + '!')
})