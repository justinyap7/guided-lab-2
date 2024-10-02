import express from 'express';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong");
    }
});

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


app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("No planets for you! ☹");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");
        const film = await collection.find({"id":+id}).toArray();
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_characters');
        const ids = await collection.find({"film_id":+id}).toArray();
        const film_ids = ids.map(i => i.character_id);
        const character_collection = db.collection("characters");
        const finds = await Promise.all(film_ids.map(async (i) => {
            return (await character_collection.find({"id":i}).toArray());}));
        res.json(finds);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films_characters");
        const character = await collection.find({"character_id":+id}).toArray();
        const character_ids = character.map(i => i.film_id);
        const character_collection = db.collection("films");
        const finds = await Promise.all(character_ids.map(async (i) => {
            return (await character_collection.find({"id":i}).toArray());}));
        res.json(finds);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const {id} = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const planet = await collection.find({"homeworld":+id}).toArray();
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
}); 