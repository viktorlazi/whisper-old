# Whisper
Whisper is a security and privacy oriented messaging service.

## How secure and private is it?
* Messages, contacts, passwords and usernames are encrypted client side using custom E2EE.
* The encryption method in this project is just a proof of concept and should not be used for security reasons. (I am not a cryptographer! This method is vulnerable to attacks)
* Database stores only unread messages and after they are fetched, disappear completely.
* After the messages are recieved, server deletes them from memory (this comes at a price, if you refresh the browser the messages are lost)
* There is no need for a phone number, only username and password

## How's it made?
* Built in React to run in browsers
* Node.js and express is used server side
* MongoDB as a database storing usernames, passwords, unread messages...

## Setup
To run it locally:
* npm start in client directory
* nodemon server.js in server directory

## Prime number used

   111F728933532D

   The generator is: 2.
