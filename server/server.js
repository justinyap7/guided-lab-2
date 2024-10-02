import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const result = await collection.find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const result = await collection.find({"id":+id}).toArray();
        console.log("character " + id);
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const result = await collection.find({"id":+id}).toArray();
        console.log("planet " + id);
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_planets');
        const ids = await collection.find({"film_id":+id}).toArray();
        const planet_ids = ids.map(i => i.planet_id);
        console.log("film_planets ids " + planet_ids);
        const planet_collection = db.collection("planets");
        const finds = await Promise.all(planet_ids.map(async (i) => {
            return (await planet_collection.find({"id":i}).toArray());}));
        res.json(finds);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_planets');
        const ids = await collection.find({"planet_id":+id}).toArray();
        const film_ids = ids.map(i => i.film_id);
        console.log("planet_films ids " + film_ids);
        const film_collection = db.collection("films");
        const finds = await Promise.all(film_ids.map(async (i) => {
            return (await film_collection.find({"id":i}).toArray());}));
        res.json(finds);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});