// include library
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

// include all js module
const database = require('./dbconnection');
const userController = require('./controllers/user');


// middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user', userController);

// defualts routes
app.all('/', function (req, res) {
    return res.json({
        status: true,
        message: 'default route...'
    });
}
);

// start server
app.listen(
    port,
    function () {
        console.log(`server running at port:${port}`);
    }
);