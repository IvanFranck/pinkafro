let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//set up schema
var userSchema = mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    last_update:{
        type:Date,
        default: Date.now()
    },
    created_at:{
        type:Date,
        default: Date.now()
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//this method will hash the password before saving the user model
userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

//this method generates an auth token for user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        mail: user.mail
    }, 'pinkafro');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error ({error: "invalid login details"});
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) throw new Error({error: "Invalid login details"});
    return user;
}

const User = module.exports = mongoose.model('users', userSchema);