const express = require('express');
const router = express.Router();

// Ruta del VSL con calculadora
router.get('/calc', async (req, res) => {
    // Get currency from query string (default: $)
    const currency = req.query.currency ? req.query.currency : '$';
    res.render('public_tools/vsl_calc', { currency })
});




module.exports = router;
