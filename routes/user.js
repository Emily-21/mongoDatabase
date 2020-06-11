const { Router } = require('express');
const router = Router();

const userController = require('../controllers/userController')

//SIGNUP section 

router.get('/', userController.getSignup);

router.post('/signup', userController.createUser);


//LOGIN SECTION

router.get('/login', userController.getLogin);


router.post('/login', userController.postLogin);

//PROFILE SECTION

router.get('/profile', userController.showProfile)


module.exports = router;
