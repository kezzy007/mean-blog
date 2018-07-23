const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const socketIo = require('socket.io');

const dbConfig = require('./config/database');  
const environment = require('./env');

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');


// Mongodb connection
const mongoose = require('mongoose');
mongoose.connect(dbConfig.database, (message) => {  console.log(message); });

const app = express();

const server = app.listen(environment.APP_PORT, () => {
    console.log("Server is running");
});

// Socket is configured to work with this server
var io = socketIo(server);

app.use(function(req, res, next) {
    'use strict';
     req.io = io; next();
});

// Cors configuration
app.use(cors());

// Body parser config
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());

// Admin routes configuration
app.use('/admin', adminRoutes);

// User routes configuration
app.use('/users', userRoutes);

app.get('/', (req,res) => { res.send('Hello there'); });





// A listener is registered on the socket for all connection
io.on('connection', (socket) => {

    console.log('made socket connection to the server');

    // Add a listener for commenting on a post on socket
    socket.on('commenting', (post_id) => {

        console.log('commenting on post', post_id);

        socket.broadcast.emit('commenting', post_id);
    
    });

});




// Set the io on the app
// app.io = io;