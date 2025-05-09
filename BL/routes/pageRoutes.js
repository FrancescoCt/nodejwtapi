const express = require('express');
const authMiddleware = require('../middleware/auth');

const loginController = require('../controllers/loginController');
const pageController = require('../controllers/pageController');

const router = express.Router();

//Manage CORS Policy
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//No Auth needed
router.get('/home', pageController.homePage);

//First step for auth: login with the admin credentials you find in the env file
router.get('/login', loginController.loginPage); //Landing page
router.post('/login', loginController.loginPost); //Validation of user credentials

router.get('/signin', loginController.signInPage); //Landing page
router.post('/signin', loginController.createUser); //Create user credentials
router.post('/signout', loginController.signOut); //Enter the unauthorized mode

//To access these pages you need to be autenticated
router.get('/apiHelper', [authMiddleware.checkAuth], pageController.apiHelperPage);
router.get('/customerApi', [authMiddleware.checkAuth], pageController.customerAPIPage);
router.get('/productApi', [authMiddleware.checkAuth], pageController.productAPIPage);
router.get('/orderApi', [authMiddleware.checkAuth], pageController.orderAPIPage);

// router.get('/pages/:id', pageController.getpageById);

module.exports = router;
