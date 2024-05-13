
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./dbconn');

require('dotenv').config();

const app = express();
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

const port = process.env.PORT || 8080;


connectDB()
    .then(() => {
        console.log("Connected to MongoDB Database");
        app.listen(port, (error) => {
            if (error) {
                console.error('Error starting the server:', error);
            } else {
                console.log(`The server is running on port ${port}`);
            }
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
