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
app.set('trust proxy', 1);

// DB Connection
mongoose.connect(process.env.MONGODB_CONN_STR)
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

app.listen(process.env.BE_PORT, '0.0.0.0', () => {
    console.log(`Listening on port : ${process.env.BE_PORT}...`);
});
