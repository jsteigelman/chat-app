# Chat App

## Description
This is a Node.js chat app with real-time data transfer.

## Live Site URL
This app is deployed to Heroku: 
[https://steigelman-chat-app.herokuapp.com/](https://steigelman-chat-app.herokuapp.com/)

## Functionality
* User can join a chat room by entering a username and chat room name
* User can send messages that will be received by all other users in the same chat room
* User can send their location to other users in the same chat room by clicking the "Share Location" button (caution: sharing your location will drop a pin on Google Maps with your exact location; please be cautious when sharing this information)
* Messages containing profanity are blocked, and the offending user will receive an alert when attempting to submit the message

To test this project with multiple users in a chat room, simply open the URL in two seperate browser windows. Enter the same chat room name in both tabs. There, you will be able to send and receive messages in real-time.

## Built With
* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
* [Express](https://expressjs.com/) - web application framework
* [socket.io](https://www.npmjs.com/package/socket.io) - real-time bidirectional event-based communication
* [Moment.js](https://www.npmjs.com/package/moment) - JavaScript date library for parsing, validating, manipulating, and formatting dates
* [mustache](https://www.npmjs.com/package/mustache) - zero-dependency implementation of the mustache template system in JavaScript
* [qs](https://www.npmjs.com/package/qs) - querystring parsing and stringifying library with some added security
* [bad-words](https://www.npmjs.com/package/bad-words) - JavaScript filter for bad words

## Preview

