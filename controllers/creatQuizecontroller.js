

const creatQuizemodel = require('../models/creatquizemodel')

exports.getCreatQuize = (req,res,next)=>{
    let quizeid=req.session.quizeid;
    creatQuizemodel.QetQuestionbyQuizeId(quizeid).then((question)=>{
        res.render('creatQuize',{
            question:question,
           comefrom : req.flash("comefrom")[0],
           name : req.session.name,
           time : req.session.time,
           userid:req.session.userid,
           username:req.session.username,
           usertype:req.session.usertype
        })

    })
   
   
}
exports.getCreatQuizestar= (req,res,next)=>{
   if(req.session.userid)
   {
      req.session.quizeid="";
    var come = "ggggg "
    req.flash('come',come)
    res.render('creatQuize',{
       userid:req.session.userid,
       comefrom : req.flash("comefrom")[0],
       name : req.flash('name')[0],
       time : req.flash('time')[0],
       userid:req.session.userid,
       username:req.session.username,
       usertype:req.session.usertype,
       question:""
    })
  }
  else{
    res.redirect('/signup')
  }
    
}

exports.postCreatQuize = (req,res,next)=>{

   let name = req.body.name;
   let time = req.body.time;
   let question = req.body.Question
   let cho1 = req.body.A;
   let cho2 = req.body.B;
   let cho3 = req.body.C;
   let correct = req.body.correct; 
   let come = req.body.come;
   let t_id = req.session.userid;
   let t_name= req.session.username;
   let q_id = req.body.q_id;
  
   req.flash('comefrom',come)
   req.session.name=name;
   req.session.time = time;
   req.flash('name',name)
   req.flash('time',time)

 if(!q_id){
  if(req.flash("come")[0])
  {
  
      creatQuizemodel.saveQuize(name,time,t_name,t_id).then(Q_id=>{
          
          
          req.session.quizeid=Q_id;
          let Quize_id=Q_id;
          creatQuizemodel.saveQuestion(question,Quize_id,cho1,cho2,cho3,correct).then(()=>{
            res.redirect('/creatQuize')
          })
      }).catch(err=>{
          console.log(err)
      })

  }

  else
  {
     
      let Quize_id = req.session.quizeid;
  
    creatQuizemodel.saveQuestion(question,Quize_id,cho1,cho2,cho3,correct).then(()=>{
        res.redirect('/creatQuize')
      })
  }
  
}
else{
  creatQuizemodel.updatequestion(q_id,question,cho1,cho2,cho3,correct).then(()=>{
    res.redirect('/creatQuize')
  })

}
   
}

exports.publishQuiz=(req,res,next)=>{
let quizeid = req.params.quizeid;
creatQuizemodel.publishQuizbyId(quizeid).then(()=>{
  res.redirect('/publishedquizes')
})


}

exports.getAllQuizes = (req,res,next)=>{
  
  creatQuizemodel.getAllQuizes().then((quizes)=>{
    console.log("from controller"+quizes);
    res.render('allquizes',{
      quizes:quizes,
      userid:req.session.userid,
      usertype:req.session.usertype
    })
  }).then(err=>{
    console.log(err)
  })

}
exports.getSavedquizes = (req,res,next)=>{

  let teacherid = req.session.userid;
     creatQuizemodel.getSavedquizes(teacherid).then((quizes)=>{
       res.render('savedquizes',{
        quizes:quizes,
        userid:req.session.userid,
        usertype:req.session.usertype
       })
     }).then(err=>{
       console.log(err)
     })
}

exports.getpublishedquizes = (req,res,next)=>{

  let teacherid = req.session.userid;
     creatQuizemodel.getpublishedquizes(teacherid).then((quizes)=>{
       res.render('publishedquizes',{
        quizes:quizes,
        userid:req.session.userid,
        usertype:req.session.usertype
       })
     }).then(err=>{
       console.log(err)
     })
}


exports.deletquestion = (req,res,next)=>{
 
let q_name = req.params.name;
let q_time = req.params.time;
let questionid = req.params.questionid;
let quizeid = req.params.quizeid;
if(q_name&&q_time)
{
  creatQuizemodel.deletquestion(questionid).then(()=>{
    console.log(questionid);
    console.log(quizeid +q_name +q_time)
    res.redirect('/quizeQuestions/'+quizeid+'/'+q_name+'/'+ q_time)
  }).then(err=>{
    console.log(err)
  })
}
else{
creatQuizemodel.deletquestion(questionid).then(()=>{
  console.log(questionid);
  res.redirect('/creatQuize')
}).then(err=>{
  console.log(err)
})
}
}

exports.getquestionsbyquizeid =(req,res,next)=>{
  let quizeName = req.params.name;
  let quizeTime = req.params.time;
  let quizeid=req.params.quizeid;
  console.log("from controller"+quizeid);
  creatQuizemodel.QetQuestionbyQuizeId(quizeid).then((questions)=>{
  
    res.render('quizeQuestions',{
      question:questions,
      userid:req.session.userid,
      username:req.session.username,
      usertype:req.session.usertype,
      quizename:quizeName,
      quizetim:quizeTime,
     quizeid: req.params.quizeid
    })
  })
}

exports.savequestion=(req,res,next)=>{

  let name = req.body.name;
   let time = req.body.time;
   let question = req.body.Question
   let cho1 = req.body.A;
   let cho2 = req.body.B;
   let cho3 = req.body.C;
   let correct = req.body.correct; 
  let question_id=req.body.question_id;
  let q_id = req.body.q_id;
  if(question_id==="new"){
    creatQuizemodel.updatequestion(question_id,question,cho1,cho2,cho3,correct).then(()=>{
      res.redirect('/quizeQuestions/'+q_id+'/'+name+'/'+time)
    })
  }
  else{
   console.log(question+q_id+cho1+cho2+cho3+correct);
   creatQuizemodel.saveQuestion(question,q_id,cho1,cho2,cho3,correct).then(()=>{
    res.redirect('/quizeQuestions/'+q_id+'/'+name+'/'+time)
  })
}
}