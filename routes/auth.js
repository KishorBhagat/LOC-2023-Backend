const express = require('express');
const router = express.Router();
const Registrant = require('../models/Registrant');
const e = require('express');

const handleErrors = (err) => {
    let errors = {regdNo: '', email: '', phone: ''};
    if(err._message.includes('registrant validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

router.post('/register', async (req, res) => {
    
    try {
        const { firstname, lastname, regdNo, year, branch, email, phone } = req.body;
        const data = await Registrant.findOne({ regdNo });
        if(data){
            res.status(403).json({error: {message: "User already registered."}});
        }
        else {
            const newRegistrant = new Registrant({
                firstname,
                lastname,
                regdNo,
                year,
                branch,
                email,
                phone
            });
            const registrant = await newRegistrant.save();
            res.status(200).json(newRegistrant);
        }
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
});

router.get('/registrants', async (req, res) => {
    try {
        const registrants = await Registrant.find();
        res.status(200).json(registrants);
    } catch (error) {
        res.status(500).json({ error: {"message": "Something went wrong!"} });
    }
});

router.get('/registrants/:regdno', async (req, res) => {
    try {
        const registrant = await Registrant.find({regdNo: req.params.regdno});
        res.status(200).json(registrant);
    } catch (error) {
        res.status(500).json({ error: {"message": "Something went wrong!"} });
    }
});

module.exports = router;