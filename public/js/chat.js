const socket = io()

// send data (print a message) from server to client
socket.on('message', (message) => {
    console.log(message)
})

// send data from client to server
document.querySelector('#message-form').addEventListener('submit', (event) => {
    
    // prevent page from refreshing on form submission
    event.preventDefault() 

    // send data (chat message) from client to server
    const chatMessage = event.target.elements.message.value
    socket.emit('sendChatMessage', chatMessage)
})

// share user location
document.querySelector('#share-location').addEventListener('click', () => {
    
    // no support for sharing location
    if (!navigator.geolocation) {
        return alert('Sorry, geolocation is not supported by your browser.')
    }

    // send data (location) from client to server
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})