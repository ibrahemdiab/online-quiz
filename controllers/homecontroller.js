
exports.gethome = (req,res,next)=>{
    res.render('index',{
        userid:req.session.userid,
        username:req.session.username,
        usertype:req.session.usertype
    })
}


