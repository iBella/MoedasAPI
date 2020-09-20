const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("API Moedas - OK");
    return res.render('index');
});

module.exports = router;