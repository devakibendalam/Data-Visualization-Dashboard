const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const { initializeDatabase } = require('./initializeDatabase');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and initialize data
mongoose.connect('mongodb://127.0.0.1:27017/dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        initializeDatabase(); // Initialize data from jsondata.json

        // Start the server after connecting to MongoDB and initializing data
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// API routes
app.use('/api', dataRoutes);
