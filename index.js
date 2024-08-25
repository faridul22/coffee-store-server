const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// --------------------------------MongoDB---------------------------

const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.xwjksg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const coffeeCollection = client.db('coffeeDB').collection('coffee');

        app.get('/coffee', async (req, res) => {
            const coffee = await coffeeCollection.find().toArray();
            res.send(coffee)
        })

        app.post('/coffee', async (req, res) => {
            const coffee = req.body;
            const result = await coffeeCollection.insertOne(coffee);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

//----------------------------------End------------------------------

app.get('/', (req, res) => {
    res.send('Coffee making server is Running');
})

app.listen(port, () => {
    console.log(`Coffee server is Running on port: ${port}`)
})