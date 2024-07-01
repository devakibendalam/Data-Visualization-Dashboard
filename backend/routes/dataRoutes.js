const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

router.get('/data', async (req, res) => {
    try {
        const {
            end_year,
            topic,
            sector,
            region,
            pestle,
            source,
            start_year,
            impact,
            added,
            published,
            country
        } = req.query;
        const query = {};
        if (end_year) query.end_year = end_year;
        if (topic) query.topic = topic;
        if (sector) query.sector = sector;
        if (region) query.region = region;
        if (pestle) query.pestle = pestle;
        if (source) query.source = source;
        if (start_year) query.start_year = start_year;
        if (impact) query.impact = impact;
        if (added) query.added = added;
        if (published) query.published = published;
        if (country) query.country = country;
        const data = await Data.find(query);

        res.json(data);
    } catch (err) {
        console.error(`Error fetching data: ${err}`);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

module.exports = router;

