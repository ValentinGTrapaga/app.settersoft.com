const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const privateToolsController = require('../controllers/privateToolsController');


// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta del VSL con calculadora (ENGLISH)
router.get('/translator/', async (req, res) => {
    res.render('private_tools/translator')
});

router.post('/translator/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const filename = file ? file.filename : '';
    console.log(filename)

    // Translate file
    let response = await privateToolsController.translateFile(filename);

    res.json(response);
});

module.exports = router;
