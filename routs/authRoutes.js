const router = require('express').Router()
const authcontroller = require('../controllers/authController')
const bodyParser = require('body-parser')
const check = require('express-validator').check
const userAuth = require('./guards/userAuth')
const bcrypt = require('bcrypt')

router.get('/signup',userAuth.userAuth,authcontroller.getSignup)

router.post('/signup',userAuth.userAuth,bodyParser.urlencoded({extended:true}),
 check("T_name").not().isEmpty().withMessage("teacher name required"),
 check("Email").not().isEmpty().withMessage("email is required").isEmail().withMessage("failed format"),
 check("password").not().isEmpty().withMessage("password is required").isLength({min:6}).withMessage("password must be at least 6 carachter"),
 check("c_password").custom((value,{req})=>{
     if(value === req.body.password)
       return true
    else
        throw "password not the same"
 })
,authcontroller.postSignup)



router.get('/login',userAuth.userAuth,authcontroller.getlogin)
router.post('/login',userAuth.userAuth,bodyParser.urlencoded({extended:true}),authcontroller.postlogin)
router.get('/logout',authcontroller.logout)


module.exports = router;