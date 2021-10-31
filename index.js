const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.la7pp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run () {
    try{
        await client.connect();
        const database = client.db('travel_website');
        const productCollection = database.collection('products');
        const orderCollection = database.collection('orders');


        app.get('/products', async(req, res)=>{
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });

        // app.get('/orders', async (req, res)=>{
        //     const order = req.body;
        //     console.log('order', order);
        //     res.send('order processed');
        // })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('server is running');
});

app.listen(port, ()=>{
    console.log('server running at port', port);
});