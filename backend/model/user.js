const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        required: true, 
        default: 'User',
    },
});

module.exports = mongoose.model('User', userSchema);
