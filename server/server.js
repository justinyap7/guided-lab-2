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
        const collection = db.collection("character");
        const character = await collection.find({"id":+id}).toArray();
        const characrter_ids = character.map(i => i.characrter_id);
        const character_collection = db.collection("characters");
        const finds = await Promise.all(characrter_ids.map(async (i) => {
            return (await character_collection.find({"id":1}).toArray());}));
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
        const collection = db.collection("characters");
        const character = await collection.find({"id":+id}).toArray();
        const characrter_ids = character.map(i => i.characrter_id);
        const character_collection = db.collection("film_characters");
        const finds = await Promise.all(characrter_ids.map(async (i) => {
            return (await character_collection.find({"id":1}).toArray());}));
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
        const collection = db.collection("planet");
        const planet = await collection.find({"id":+id}).toArray();
        const characrter_ids = character.map(i => i.characrter_id);
        const character_collection = db.collection("characters");
        const finds = await Promise.all(characrter_ids.map(async (i) => {
            return (await character_collection.find({"id":1}).toArray());}));
        res.json(finds);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
}); 