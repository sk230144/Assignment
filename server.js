const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://risabht043:Skt230144@cluster0.i954vcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for your data (assuming you have a model named 'Item')
const itemSchema = new mongoose.Schema({
  name: String,
  // Add other fields as needed
});
const Item = mongoose.model('Item', itemSchema);

// Variables to keep track of the counts
let addCount = 0;
let updateCount = 0;

// API endpoint to add new data
app.post('/api/items', async (req, res) => {
  try {
    addCount++; // Increment add count
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ newItem, itemId: newItem._id }); // Return newItem and its _id
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// API endpoint to edit existing data (assuming you have an '_id' field for each item)
app.put('/api/items/:id', async (req, res) => {
  try {
    updateCount++; // Increment update count
    const itemId = req.params.id;
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to get counts
app.get('/api/counts', (req, res) => {
  res.json({ addCount, updateCount });
});

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "new", "build")));
  res.sendFile(path.resolve(__dirname, "new", "build", "index.html"));
});

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
