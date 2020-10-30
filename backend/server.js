// declaring variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// to use variables in .env file
require('dotenv').config();

// create express server
const app = express();
//the port of the server.  Tell server to use whatever port is or use 5000 if running locally
const port = process.env.PORT || 5000;

app.use(cors());
// to parse json because server is sending/receiving json
app.use(express.json());

// start MongoDB connection.  Looks at the .env folder for connection string.  CAN'T BE ON VPN
// pass in the uri from .env file
const uri = process.env.ATLAS_URI;
// properties here are just required due to MongoDB code changes
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
// after one connection, log message below
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// specify the file paths
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// when people go to the specified locations below, load the files mentioned above
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// tells Heroku to run the following path if node environment is running in prod
if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
}

// starts the server
app.listen(port, () => {
    console.log("Server is running on port " + port);
});