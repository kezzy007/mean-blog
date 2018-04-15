const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const dbConfig = require('./config/database');
const environment = require('./env');

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

// Mongodb connection
const mongoose = require('mongoose');
mongoose.connect(dbConfig.database, (message) => {  console.log(message); });

const app = express();


// Cors configuration
app.use(cors());

// Body parser config
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());

// Admin routes configuration
app.use('/admin', adminRoutes);

// User routes configuration
app.use('/user', userRoutes);

app.get('/', (req,res) => { res.send('Hello there'); });

app.listen(environment.APP_PORT, () => {
    console.log("Server is running");
});