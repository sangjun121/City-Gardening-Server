const express = require('express');
const router = express.Router();
const connectToDatabase = require('../../config/database-pool');

router.post('/register', async (req, res) => {
    res.json(req.body);
});

module.exports = router;
