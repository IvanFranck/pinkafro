//import user model
const User = require('../models/userModel');

//handle register new user action
exports.registerNewUser = async (req, res) => {
    try {
        // console.log(isUser);
        // if (isUser.length >= 1) {
        //     return res.status(409).json({
        //         message: "email already in use"
        //     });
        // };


        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mail: req.body.mail,
            password: req.body.password
        });
        let data = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({data, token });
    }catch (err){
        res.status(404).json({ err: err});
    };
};

//handle log in user action
exports.loginUser = async (req, res) => {};

//handle register get user details action
exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};