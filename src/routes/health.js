const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Change if your URI is different
const dbName = 'AUTH';

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/mongo-test', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('testCollection');

    // Insert documents
    await collection.insertMany([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ]);
    // Find documents
    const docs = await collection.find({}).toArray();
    // Delete documents
    await collection.deleteMany({});

    res.json({ success: true, docs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
