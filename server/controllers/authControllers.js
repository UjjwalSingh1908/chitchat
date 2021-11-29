const User = require("../models/User");

const alertError = (err) => {
    let errors = {name:'', email:'', password:''};
    // console.log(`error message : ${err.message}`, `error code : ${err.code}`, err );
    if(err.code === 11000) {
        errors.email = 'Email already exists';
        return errors;
    }
    if(err.message.includes('user validation failed'))
    Object.values(err.errors).forEach(({properties}) => 
    {
        errors[properties.path] = properties.message
    });
    return errors;
}

module.exports.signup =  async(req, res) => {
    const {name, password, email} = req.body;
    try{
        const user = await User.create({name,email,password});
        res.status(201).json(user);
    }
    catch (error){
    let errors = alertError(error);
    res.status(400).json({errors});
    }
}

module.exports.login = (req, res) => {
    res.send('login')
}

module.exports.logout = (req, res) => {
    res.send('logout');
}