const express = require('express');
const mongoose = require('mongoose');

const checkLogin = require('../middlewares/checkLogin');
const recordsSchema = require('../schemas/recordsSchema');
const userSchema = require('../schemas/userSchema');

const Records = mongoose.model('Record', recordsSchema);
const User = new mongoose.model('User', userSchema);

const router = new express.Router();

router.get('/', checkLogin, async (req, res) => {
    try {
        const record = await Records
            .where('userId')
            .equals(req.userInfo._id)
            .limit(1)
            .select(['incomes', 'expenses', 'availableBalance']);
        if (record && record.length > 0) {
            res.status(200).json({
                data: record[0],
            });
        } else {
            const newRecord = new Records({
                incomes: [],
                expenses: [],
                userId: req.userInfo._id,
                availableBalance: 0,
            });
            const data = await newRecord.save();
            const userData = await User.updateOne(
                { _id: req.userInfo._id },
                { recordId: data._id },
                { new: true },
            );
            const { acknowledged } = userData;
            if (acknowledged) {
                res.status(200).json({
                    data,
                });
            } else {
                // could not store recordId to user document
                res.status(500).json({
                    error: 'Internal server error.',
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error.',
        });
    }
});

router.post('/', checkLogin, async (req, res) => {
    try {
        const { userInfo, body } = req;

        const description = typeof (body.description) === 'string' && body.description.length > 0 ? body.description : false;
        const cost = typeof (body.cost * 1) === 'number' ? body.cost * 1 : false;
        const operation = typeof (body.operation) === 'string' && ['income', 'expense'].indexOf(body.operation.toLowerCase()) > -1 ? body.operation.toLowerCase() : false;

        if (description && cost && operation) {
            const user = await User.find({ phone: userInfo.phone });
            if (user && user.length > 0) {
                if (user[0].recordId) {
                    const records = await Records.find({ _id: user[0].recordId });
                    if (records && records.length > 0) {
                        if (operation === 'income') {
                            records[0].availableBalance += cost;
                            records[0].incomes.push({
                                description,
                                cost,
                            });
                        } else {
                            records[0].availableBalance -= cost;
                            records[0].expenses.push({
                                description,
                                cost,
                            });
                        }
                        await Records.findOneAndUpdate(
                            { _id: records[0]._id },
                            records[0],
                            { new: true },
                        );
                        res.status(200).json({
                            message: 'update successful',
                        });
                    } else {
                        res.status(500).json({
                            error: 'Internal server error.',
                        });
                    }
                } else {
                    res.status(500).json({
                        error: 'Internal server error.',
                    });
                }
            } else {
                res.status(404).json({
                    error: 'User not found!',
                });
            }
        } else {
            res.status(400).json({
                error: 'Please provide valid information.',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});

router.delete('/', checkLogin, async (req, res) => {
    try {
        const indx = typeof (req.query.indx) === 'string' && typeof (req.query.indx * 1) === 'number' ? req.query.indx * 1 : -1;
        const operation = typeof (req.query.operation) === 'string' && ['expense', 'income'].indexOf(req.query.operation.toLowerCase()) > -1 ? `${req.query.operation}s` : false;
        if (indx > -1 && operation) {
            const itemArr = await Records.where('userId').equals(req.userInfo._id).select([operation, 'availableBalance']);
            if (itemArr && itemArr.length > 0) {
                const items = itemArr[0][operation];
                if (items && items.length > 0 && indx < items.length) {
                    let { availableBalance } = itemArr[0];
                    if (operation === 'incomes')availableBalance -= items[indx].cost;
                    else availableBalance += items[indx].cost;
                    items.splice(indx, 1);
                    const data = await Records.findOneAndUpdate(
                        { userId: req.userInfo._id },
                        { [operation]: items, availableBalance },
                        { new: true },
                    );
                    if (data[operation].length === items.length) {
                        res.status(200).json({
                            message: 'Deleted successfully!',
                        });
                    } else {
                        res.status(500).json({
                            error: 'Internal server error.',
                        });
                    }
                } else {
                    res.status(400).json({
                        error: 'There is a problem in the request.',
                    });
                }
            } else {
                res.status(500).json({
                    error: 'Internal server error.',
                });
            }
        } else {
            res.status(400).json({
                error: 'There was a problem in the request.',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error.',
        });
    }
});

module.exports = router;
