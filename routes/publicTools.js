const express = require('express');
const router = express.Router();

// Ruta del VSL con calculadora (ENGLISH)
router.get('/en/calc', async (req, res) => {
    // Get currency from query string (default: $)
    const currency = req.query.currency ? req.query.currency : '$';
    res.render('public_tools/vsl_calc_en', { currency })
});

// Ruta del VSL con calculadora (ESPAÑOL)
router.get('/es/calc', async (req, res) => {
    // Get currency from query string (default: $)
    const currency = req.query.currency ? req.query.currency : '$';
    res.render('public_tools/vsl_calc_es', { currency })
});







module.exports = router;
