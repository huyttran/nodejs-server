const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./api/route/products');
const orderRoutes = require('./api/route/orders');


mongoose.connect("mongodb+srv://node-shop:"+ process.env.MONGO_ATLAS_PW + "@node-rest-shop-pu2r0.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true });

// mongoose.connect('mongodb+srv://node-shop:node-shop@node-rest-shop-pu2r0.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* CORS middleware problem */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;