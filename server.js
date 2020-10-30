// declaring variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

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
// looks in the following folder for static files (e.g. pictures)
app.use(express.static(path.join(__dirname, "client", "build")));

// tells Heroku to run the following path if node environment is running in prod
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// a 'catch all' route handler.  needs to be near the bottom of the file so that it will only be enacted if the API routes above it don't handle the request
// it's in charge of sending the main index.html file back to the client if it didn't receive a request it recognized otherwise
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// starts the server
app.listen(port, () => {
    console.log("Server is running on port " + port);
});