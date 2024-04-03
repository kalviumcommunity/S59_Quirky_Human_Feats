const express=require('express');
const app=express();

app.get("/ping" , (req, res)=>{
    res.send("pong");
})

const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`The server is running on port $port`)});