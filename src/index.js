const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000 
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

const adminName = 'Chatterbox Team'

// emit data from server to client 
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({ username, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
           return callback(error)
        }

        socket.join(user.room)
        
        socket.emit('message', generateMessage(adminName, `Welcome to Chatterbox, ${user.username}!`))
        socket.broadcast.to(user.room).emit('message', generateMessage(adminName, `${user.username} has joined the chat.`))
    
        callback()
    })

    socket.on('sendChatMessage', (chatMessage, callback) => {

        const user = getUser(socket.id)

        const filter = new Filter()
        
        // prevent message from sending due to profanity
        if (filter.isProfane(chatMessage)) {
            return callback('Profanity is not allowed in the chat.')
        }

        io.to(user.room).emit('message', generateMessage(user.username, chatMessage))
        callback()
    })

    socket.on('shareLocation', (locationCoordinates, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${locationCoordinates.latitude},${locationCoordinates.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage(adminName, `${user.username} has left the chat.`))
        }
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port + '!')
})