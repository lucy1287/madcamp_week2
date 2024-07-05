var express = require('express');
var router = express.Router();

var crawler = require('../controllers/crawler');

router.get('/', async function(req, res) {
    try {
        const results = await crawler.crawler();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;