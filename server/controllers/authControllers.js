const User = require("../models/User");

module.exports.signup =  async(req, res) => {
    const {name, password, email} = req.body;
    try{
        const user = await User.create({name,email,password});
        res.status(201).json(user);
    }
    catch (error){
res.status(400).send("failed to create user");
console.log(error)
    }
}

module.exports.login = (req, res) => {
    res.send('login')
}

module.exports.logout = (req, res) => {
    res.send('logout');
}