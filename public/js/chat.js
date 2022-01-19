const socket = io()

// elements with dollar sign naming convention
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $shareLocationButton = document.querySelector('#share-location')

// send data (print a message) from server to client
socket.on('message', (message) => {
    console.log(message)
})

// send data from client to server
$messageForm.addEventListener('submit', (event) => {
    
    // prevent page from refreshing on form submission
    event.preventDefault() 

    // disable submit button
    $messageFormButton.setAttribute('disabled', 'disabled')

    // send data (chat message) from client to server
    const chatMessage = event.target.elements.message.value
    socket.emit('sendChatMessage', chatMessage, (error) => {

        // re-enable submit button and clear input
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Delivered')
    })
})

// share user location
$shareLocationButton.addEventListener('click', () => {
    
    // no support for sharing location
    if (!navigator.geolocation) {
        return alert('Sorry, geolocation is not supported by your browser.')
    }

    // disable location button
    $shareLocationButton.setAttribute('disabled', 'disabled')

    // send data (location) from client to server
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location delivered.')  
            // re-enable location button
            $shareLocationButton.removeAttribute('disabled')
        })
    })
})