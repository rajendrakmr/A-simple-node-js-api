// include library
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
        required:true
    },
    createdOn: {
        type: String,
        default: Date.now()
    }, isActive: {
        type: Boolean ,
        default:true
    }
});


// user model
mongoose.model('users', userSchema);
// module exports
module.exports = mongoose.model('users');