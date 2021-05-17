//import user model
const User = require('../models/userModel');

//handle register new user action
exports.registerNewUser = async (req, res) => {
    try {
        console.log(isUser);
        if (isUser.length >= 1) {
            return res.status(409).json({
                message: "email already in use"
            });
        };


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
exports.loginUser = async (req, res) => {
    try {
        const email = req.body.mail;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if(!user) return status(401).json({ error : "login failed check authentification crédentials"});
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token});
    } catch (error) {
        res.status(400).json({err: error})
    }
};

//handle register get user details action
exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};