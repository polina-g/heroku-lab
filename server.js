//===================================================
//DEPENDENCIES
//===================================================
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config();
//===================================================
//PORT
//===================================================
const PORT = process.env.PORT || 3000;
//===================================================
//DATABASE
//===================================================
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
//Error / Success
db.on('error', (err) => console.log(err.message + ' Something went wrong with the database'));
db.on('connected', () => console.log('MongoDB Connected!'));
db.on('disconnected', () => console.log('MongoDB Disconnected!'));
//===================================================
//MIDDLEWARE
//===================================================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
//===================================================
//ROUTES
//===================================================
//=====================INDEX=========================
app.get('/', (req, res) => {
    res.send('Hello, World');
});
//===================================================
//LISTENER
//===================================================
app.listen(PORT, () => console.log(`Express is listening on port: ${PORT}`));