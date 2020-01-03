const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// JSON ONLY DEFINED
app.use(express.json());

// ALLOW CORS ORIGIN
app.use(cors());

// IMPORT ROUTES
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const profileRoutes = require('./routes/profile');

// USE ROUTES TO EXECUTE
app.use('/', homeRoutes)
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/profile', profileRoutes);

// DATABASE CONNECTION
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
    .once('open', () => console.log("Connected"))
    .on('error', (error) =>{console.log("Error", error);
});

// PORT TO LISTEN
app.listen(80);