const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
    incomes: [{
        description: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
    }],
    expenses: [{
        description: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    availableBalance: {
        type: Number,
        default: 0,
    },
});

module.exports = recordsSchema;
