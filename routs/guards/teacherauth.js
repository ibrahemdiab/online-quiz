exports.teacherAuth= (req,res,next)=>{
    if(req.session.usertype === "teacher") next()
    else
    res.redirect('/login')
}


