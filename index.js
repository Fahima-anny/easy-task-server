const express = require('express');
const cors = require('cors');
require('dotenv').config() ;
const app = express() ;
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware 
app.use(express.json()) ;
app.use(cors()) ;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ohdc4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
console.log(process.env.DB_USER,process.env.DB_PASS);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const usersCollection = client.db("easyTaskDB").collection("users");
    const tasksCollection = client.db("easyTaskDB").collection("tasks");

    app.post("/users", async (req, res) => {
        const userInfo = req.body ;
        console.log(userInfo);
        const result = await usersCollection.insertOne(userInfo) ;
        res.send(result) ;
    })

    app.get("/users", async (req,res) => {
        const email = req.query.email ;
        console.log(email);
        const query = {email: email} ;
        const result = await usersCollection.findOne(query) ;
        res.send(result) ;
    })

    app.post("/tasks", async (req, res) => {
        const taskInfo = req.body ;
        console.log(taskInfo);
        const result = await tasksCollection.insertOne(taskInfo) ;
        res.send(result) ;
    })


    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("task management server running bro") ;
} )

app.listen(port, () => {
    console.log("Server is running on port : ", port);
})


