const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true, 'please enter a name']
    },
    email:{
        type : String,
        required: [true, 'please enter an email'],
        unique:[true,'duplicate'],
        lowercase:true,
        validate: [isEmail, 'please enter a valid email address']
    },
    password:{
        type : String,
        required: [true, 'please enter a password'],
        minlength: [6,'password should be minimum 6 characters long']
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('before save', this)
    next()
})
const User = mongoose.model('user', userSchema)
module.exports = User;