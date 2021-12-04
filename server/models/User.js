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

userSchema.statics.login = async function (email,password) {
    const user = await this.findOne({email});
    if(user) {
        const isAutthenticated = bcrypt.compare(password, user.password);
        if(isAutthenticated) {
            return user;
        }
        throw Error('incorrect password')
    }
    else {
        throw Error('incorrect email')
    }
}
const User = mongoose.model('user', userSchema)
module.exports = User;