const express = require('express');
const app=express();
app.use(express.json())

app.get("/ping" , (req, res)=>{
    res.send("pong");
})

app.get("/" , (req, res)=>{
    res.send("Server is running successfully!!");
})

const port=process.env.PORT || 3000;
app.listen(port,(error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`The server is running on port ${port}`);
    }});



    