const express = require('express');
const app = express();
require('dotenv').config();
// require('./db');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Set static folder
app.use(express.json());
app.use(express.text("*/*"));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Set routes
const publicTools = require('./routes/publicTools');

// Define routes
app.use('/tools/', publicTools);
app.use('/private/', require('./routes/privateTools'));
app.use('/userFollowersData/', require('./routes/userFollowersData'));


// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
