const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const {isAuthenticated} = require("../middlewares/authMiddleware")

router.get('/',isAuthenticated,(req,res)=>{
    res.render("pages/dashboard",{flashMessage:""})
}) ;

module.exports = router;