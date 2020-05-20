const User = require('../models/user');
const Role = require('../models/role');
const City = require('../models/city');
const Province = require('../models/province');
const Country = require('../models/country');
const PostalCode = require('../models/postalCode');
const mongoose = require('mongoose');;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signUp = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "user already exists"
                })
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    }else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            roleId: req.body.roleId,
                            email: req.body.email,
                            password: hash,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            streetNumber: req.body.streetNumber,
                            streetName: req.body.streetName,
                            cityId: req.body.cityId,
                            provinceId: req.body.provinceId,
                            countryId: req.body.countryId,
                            postalCodeId: req.body.postalCodeId,
                            phoneNumber: req.body.phoneNumber
                        });
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'user created'
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
};

exports.user_login = (req,res,next) => {
    User.find({email: req.body.email})
        .populate('provinceId')
        .populate('roleId')
        .populate('cityId')
        .populate('countryId')
        .populate('postalCodeId')
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result){
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, process.env.JWT_KEY,
                        {expiresIn: "1h"}
                    );
                    return res.status(200).json({
                        message: 'Auth succeeded',
                        user: user[0],
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.user_delete = (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};