require('dotenv').config() ;
const express = require('express');
const app = express() ;
const port = process.env.PORT || 5000 ;
const cors = require('cors');

// middleware 
app.use(express.json()) ;
app.use(cors()) ;

app.get("/", (req, res) => {
    res.send("task management server running bro") ;
} )

app.listen(port, () => {
    console.log("Server is running on port : ", port);
})


