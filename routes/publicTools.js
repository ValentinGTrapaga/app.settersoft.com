const express = require('express');
const multer = require('multer');
const router = express.Router();
const createCompletion = require('../utils/openai.js');
const { extractTextFromDocx } = require('../utils/extractTextFromDocx.js');

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

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

router.get('/es/organic-calc', async (req, res) => {
    // Get currency from query string (default: $)
    const currency = req.query.currency ? req.query.currency : '$';
    res.render('public_tools/vsl_calc_organic_es', {currency})
});

router.get('/es/new-calc', async (req, res) => {
    // Get currency from query string (default: $)
    const currency = req.query.currency ? req.query.currency : '$';
    res.render('public_tools/vsl_new_es', {currency})
});

router.get('/en/new-calc', async (req, res) => {
    // Get currency from query string (default: $)
    const currency = req.query.currency ? req.query.currency : '$';
    res.render('public_tools/vsl_new_en', {currency})
});

router.get('/generate-promise', async (req, res) => {
    res.render('public_tools/vsl_generate_promise')
})

router.post('/generate-promise/upload', upload.array("image"), async (req, res) => {
    const files = req.files;
    console.log(files)
    try {
        /** @type {{avatar: string, client: string, offer: string}} */
        const conversations = { avatar: "", client: "", offer: "" };

        for await (const file of files) {
            try {
                const extractedText = await extractTextFromDocx(file.path);
                const cleanedText = extractedText.replace(/\s+/g, " ");

                if (file.path.includes("Avatar")) {
                    conversations.avatar = cleanedText;
                } else if (file.path.includes("cliente")) {
                    conversations.client = cleanedText;
                } else {
                    conversations.offer = cleanedText;
                }
            } catch (error) {
                console.error("Error processing file:", error);
            }
        }

        const completions = await createCompletion(conversations);

        res.json({
            message: "Files processed successfully",
            completions,
            error: null,
        });
    } catch (error) {
        console.error("Error processing files:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
