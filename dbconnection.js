const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL;

// CONNECTION THE DB
mongoose.connect(
    db_url,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology:true
    },
    function(error, link) {
        assert.equal(error, null, 'DB connection Failed!...');
        // ok
        console.log(`DB connection success.. `); 
    }
)