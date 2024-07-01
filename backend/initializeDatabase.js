const mongoose = require('mongoose');
const fs = require('fs');
const Data = require('./models/Data');

const jsonFilePath = './jsondata.json';

const initializeDatabase = async () => {
    try {
        // Read the JSON file
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        console.log('JSON file read successfully.');

        // Insert the JSON data into the collection
        await Data.insertMany(jsonData);
        console.log(`Data inserted successfully. Total documents inserted: ${jsonData.length}`);
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

module.exports = { initializeDatabase };
