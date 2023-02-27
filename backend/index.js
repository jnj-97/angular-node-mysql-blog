const express = require('express');
const cors = require('cors');

const passport = require('passport');

require('dotenv').config();


var app = express();

require('./config/database');

require('./models/users');

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

require('./routes/users.route.js')(app);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);