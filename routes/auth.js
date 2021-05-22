const express = require ('express');
const User = require('../model/user');
const joi = require('joi');

const router = express.Router();

router.post('/register', async (req,res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    // try{
    //     const schema = joi.object({
    //         name: joi.string()
    //             .alphanum()
    //             .max(30)
    //             .min(3)
    //             .required(),
    //         password: joi.string(),
    //         email: joi.string()
    //             .email({minDomainSegments: 2, tlds: {
    //                 allow: ['com', 'net', 'my']
    //             }})
    //     });
    //     const valResult = schema.error.details[0].message;
    //     if (valResult.error){
    //         throw valResult.error.details[0].message; 
    //     } 
    // } catch(err){
    //     res.status(400).send(err);
    // }

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/get', async (req, res) => {
    try{
        const user = await User.find();
        console.log(user);
        res.json(user);
    }catch(err){
        res.send('Error ' + err);
    };
});

router.get('/get-id/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json(user);
    }catch(err){
        res.send('Error ' + err);
    };
});

router.patch('/update/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        user.password = req.body.password;
        console.log(user.password, req.body.password);
        const updatePassword = await user.save();
        res.json(updatePassword);
    }catch(err){
        res.send('Error ' + err);
    };
});

module.exports = router;