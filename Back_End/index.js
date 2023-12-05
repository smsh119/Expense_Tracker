const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routeHandlers/userHandler');
const trackerRouter = require('./routeHandlers/trackerHandler');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect('mongodb://localhost/Expense_Tracker')
    .then(() => {
        console.log('DB Connection Stablished...');
    }).catch(() => {
        console.log('Error Connecting to DB!');
    });

// app routes
app.use('/user', userRouter);
app.use('/tracker', trackerRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Backend Live...',
    });
});

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening on port : 3000...');
});
