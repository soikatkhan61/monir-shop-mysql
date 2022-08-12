const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
const {isAuthenticated,isUnAuthenticated,checkAdmin} = require("../middlewares/authMiddleware")

router.get('/signup',isUnAuthenticated,asyncHandler(authController.renderSignUp)) ;
router.post('/signup',isUnAuthenticated,signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.get('/login',isUnAuthenticated,asyncHandler(authController.renderSignIn)) ;
router.post('/login',isUnAuthenticated,signinValidator, asyncHandler(authController.signin));

router.get("/logout",asyncHandler(authController.logoutController))

router.get("/",(req,res)=>{
    res.send("ami auth a achi")
})

module.exports = router;