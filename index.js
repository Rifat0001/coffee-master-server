const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Coffee-Master
// X0kY4zEr4OJt843v



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rsztvpo.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://Coffee-Master:X0kY4zEr4OJt843v@cluster0.rsztvpo.mongodb.net/?retryWrites=true&w=majority";

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
        await client.connect();

        // for insert data in mongodb database 
        const coffeeCollection = client.db('coffeeDB').collection('coffee');

        // to get data from client site form 
        app.post('/coffee', async (req, res) => {
            const newCoffee = req.body;
            console.log(newCoffee)
            // for send in mongodb / its next step to insert data 
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Coffee making server is running')
})

app.listen(port, () => {
    console.log(`Coffee server is running on port: ${port}`)
})