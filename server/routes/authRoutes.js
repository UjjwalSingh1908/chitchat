const {Router} = require('express');
const router = Router();
const authController = require('../controllers/authControllers');

router.post('/signup',(req,res)=>authController.signup(req,res));
router.post('/login',(req, res)=>authController.login(req, res));
router.get('/logout',(req,res)=> authController.logout(req,res));

module.exports= router;