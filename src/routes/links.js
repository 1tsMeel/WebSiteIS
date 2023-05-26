const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/addUser', (req, res) => {
    res.render('links/addUser');
});

router.get('/login', (req, res) => {
    res.render('links/login');
});

router.post('/searchData', (req, res) => {
    res.send('received');
});

module.exports = router;