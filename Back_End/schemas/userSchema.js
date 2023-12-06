const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    recordId: {
        type: mongoose.Types.ObjectId,
        ref: 'Record',
    },
});

module.exports = userSchema;
