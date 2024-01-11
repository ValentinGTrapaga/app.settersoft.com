const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Set static folder
app.use(express.static('public'));

// Set routes
const publicTools = require('./routes/publicTools');

// Define routes
app.use('/tools/', publicTools);
app.use('/private/', require('./routes/privateTools'));


// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
