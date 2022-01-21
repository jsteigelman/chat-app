# Chat App

## Description
This is a Node.js chat app with real-time data transfer.

## Live Site URL
This app is deployed to Heroku: 
[https://steigelman-chat-app.herokuapp.com/](https://steigelman-chat-app.herokuapp.com/)

## Functionality
* User can join a chat room by entering a username and chat room name
* Users who enter the same chat room name will be placed in the same room, thereby allowing them to chat
* User can share their location by clicking the "Share Location" button
* Users can send messages by typing in the free-text field and clicking "Submit"
* Messages containing profanity are blocked from chat room, and the offending user will receive an alert when attempting to submit the message

## Built With
* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
* [Express](https://expressjs.com/) - web application framework
* [socket.io](https://www.npmjs.com/package/socket.io) - real-time bidirectional event-based communication
* [Moment.js](https://www.npmjs.com/package/moment) - JavaScript date library for parsing, validating, manipulating, and formatting dates
* [mustache](https://www.npmjs.com/package/mustache) - zero-dependency implementation of the mustache template system in JavaScript
* [qs](https://www.npmjs.com/package/qs) - querystring parsing and stringifying library with some added security
* [bad-words](https://www.npmjs.com/package/bad-words) - JavaScript filter for bad words
