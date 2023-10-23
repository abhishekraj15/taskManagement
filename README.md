# Task Management App
This is a Task Management App built with Node.js and MongoDB, using Mongoose to interact with the database.
It allows users to create accounts, log in, and manage tasks. There are two user roles: admin and regular users.
Admins have access to all user tasks.

## Description
- User Registration: Create an account with a username and unique email and password is encrypted using bcrypt module.
- User Authentication: Log in with your account and it is authenticated with jsonwebtoken module.
 After successfully authenticated, token is provided in the response from the API that is stored in the localstorage and further send the token in the headers with authorization as key and "Bearer your_token" as value in further APIs
- Task Management:
  - Create tasks with a description.
  - Read your tasks.
  - Update tasks.
  - Delete tasks.
- Admin Role:
  - Admin users have access to all user tasks for management.

### Tech
* NodeJS
* Express
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv
* HTML
* CSS
* Javascript

## Installing
- Install dependencies with npm install command
- Start the app with npm start command
