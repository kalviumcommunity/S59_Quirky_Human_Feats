const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./dbconn');
const router = require('./Routes/Route.js');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use('/category', router);

const port = 8080 || process.env.PORT;

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
