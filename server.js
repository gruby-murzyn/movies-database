const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./app/config/database');

// Connect To Database
mongoose.connect(db.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+db.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const movies = require('./app/routes/movies');

// Port Number
const port = process.env.PORT || 8000

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/movies-client/dist/movies-client')));
// Body Parser Middleware
app.use(bodyParser.json());

app.use('/movies', movies);
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/movies-client/dist/movies-client/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
