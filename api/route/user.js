const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/signup', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
    });
});

router.get('/', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'Order details',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }

});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'Updated order!'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order!'
    });
});

module.exports = router;