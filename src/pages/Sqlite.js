import React from "react";
// const { MongoClient, ServerApiVersion } = require('mongodb');

//import sqlite3 from 'sqlite3'
//import { open } from 'sqlite'


export function Sqlite() {

// this is a top-level await
    const sql = (async () => {
        // open the database
        // const db = await open({
        //     filename: './db/database.db',
        //     driver: sqlite3.Database
        // })
    })()

    return (
        <div>
            <button onClick={()=>sql()}>Connect</button>
        </div>
    );
}
//
// const client = new MongoClient('mongodb+srv://admin:@Power2024@cluster0.wq8qm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// export const start = async () => {
//     try {
//         await client.connect()
//         console.log('Connect success');
//     } catch (e) {
//         console.log(e)
//     }
// }

//1
//mongodb+srv://admin:@Power2024@cluster0.wq8qm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//2
//
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:@Power2024@cluster0.wq8qm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
