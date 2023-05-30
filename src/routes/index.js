const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/ALTAS', (req, res) => {
    res.render('links/ALTAS');
});
module.exports = router;
