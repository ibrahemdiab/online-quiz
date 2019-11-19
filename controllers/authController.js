const authmodel = require('../models/authmodel')
const validationResult = require('express-validator').validationResult



exports.getSignup = (req,res,next)=>{
    res.render('signup',{
        authErr : req.flash('authErr')[0],
        validationErr : req.flash('validationErr'),
        userid:req.session.userid,
        username:req.session.username,
        usertype:req.session.usertype
    })
}

exports.postSignup = (req,res,next)=>{
    if (validationResult(req).isEmpty())
    {
  let name = req.body.T_name;
  let email = req.body.Email;
  let password = req.body.password;
  let type = req.body.type;
  
 
  authmodel.SaveUser(name,email,password,type).then(()=>{
      res.redirect('/login')
  }).catch((err)=>{
      req.flash('authErr',err)
      res.redirect('/signup')
  })
    }
    else{
        console.log(validationResult(req).array())
        req.flash('validationErr',validationResult(req).array())
        res.redirect('/signup')
    }
}

exports.getlogin = (req,res,next)=>{
    res.render('login',{
        authErr:req.flash('authErr')[0],
        userid:req.session.userid,
        username:req.session.username,
        usertype:req.session.usertype
    })
}


exports.postlogin = (req,res,next)=>{
    
    authmodel.checkUser(req.body.Email, req.body.Password)
    .then(user=>{
        
        req.session.userid=user._id;
        req.session.username=user.T_name;
        req.session.usertype = user.Type;
        console.log(req.session.userid)
        console.log(req.session.username)
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
        req.flash('authErr',err)
        res.redirect('/login')
    })
}

exports.logout =(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}

