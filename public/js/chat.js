const socket = io()

// elements (with dollar sign naming convention)
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $shareLocationButton = document.querySelector('#share-location')
const $messages = document.querySelector('#messages')

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {

    // get newest message element
    const $newMessage = $messages.lastElementChild

    // get height of newest message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // get visible height of newest message
    const visibleHeight = $messages.offsetHeight

    // height of messages container
    const containerHeight = $messages.scrollHeight

    // how far down user has scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    // if user is scolled to bottom before newest message was added, then continue scrolling user to bottom
    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

// send data (print a message) from server to client
socket.on('message', (message) => {
    console.log(message)

    const currentUserStamp = message.username === username ? 'current-user-stamp' : ''
    const currentUserMessage = message.username === username ? 'current-user-message' : ''
    const currentUserBlock = message.username === username ? 'current-user-block' : 'other-user-block'

    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a'),
        currentUserStamp: currentUserStamp,
        currentUserMessage: currentUserMessage,
        currentUserBlock: currentUserBlock
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (locationObject) => {
    console.log(locationObject)
    const html = Mustache.render(locationMessageTemplate, {
        username: locationObject.username,
        locationUrl: locationObject.url,
        createdAt: moment(locationObject.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
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

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})