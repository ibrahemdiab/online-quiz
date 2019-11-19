const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')

const DB_url = "mongodb+srv://ibrahemhosny:hosny012@cluster0-ntfx4.mongodb.net/online-quiz?retryWrites=true&w=majority"

const Quizeschema = mongoose.Schema({
    Q_name: String,
    Time: String,
    T_name:String,
    T_id: String,
    ispublished:Boolean

})

const Quize = mongoose.model('quize',Quizeschema)


const questionschema = mongoose.Schema({
    Quize_id: String,
    Question: String,
    A: String,
    B: String,
    C: String,
    Correct:String
   
})

const Question = mongoose.model('question',questionschema )

exports.saveQuize = ( name,time,t_name,t_id)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
            let quize = new Quize({
                Q_name: name,
                Time: time,
                T_id: t_id,
                T_name:t_name,
                ispublished:false
            })
            return quize.save()
        }).then(()=>{
            Quize.findOne({Q_name:name}).then((quize)=>{
                mongoose.disconnect()
                resolve(quize._id)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })


}

exports.saveQuestion = (question,quize_id,a,b,c,correct)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
            let Nquestion = new Question({
                Question: question,
                Quize_id: quize_id,
                A: a,
                B: b,
                C: c,
                Correct:correct
            })
            return Nquestion.save()
        }).then(()=>{
             resolve("insert question")
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
        })
    })

}

exports.QetQuestionbyQuizeId = (q_id)=>{
     console.log(q_id)
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Question.find({Quize_id:q_id})
            }).then((question)=>{
                mongoose.disconnect()
                console.log(question)
             resolve(question)
           }).catch(err=>{
               mongoose.disconnect()
               reject(err)
           })
    
    })

}

exports.publishQuizbyId=(id)=>{
     console.log("   "+id)
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Quize.updateOne({_id:id},{ispublished:true})
            }).then((question)=>{
                mongoose.disconnect()
                
             resolve(question)
           }).catch(err=>{
               mongoose.disconnect()
               reject(err)
           })
    
    })

}
exports.getAllQuizes = ()=>{
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Quize.find({ispublished:true})
            }).then((quizes)=>{
                mongoose.disconnect()
                
             resolve(quizes)
           }).catch(err=>{
               mongoose.disconnect()
               reject(err)
           })
    
    })

}

exports.getSavedquizes = (t_id)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Quize.find({T_id:t_id,ispublished:false})
            }).then((quizes)=>{
                mongoose.disconnect()
                console.log(quizes)
             resolve(quizes)
           }).catch(err=>{
               mongoose.disconnect()
               reject(err)
           })
    
    })

}


exports.getpublishedquizes = (t_id)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Quize.find({T_id:t_id,ispublished:true})
            }).then((quizes)=>{
                mongoose.disconnect()
                console.log(quizes)
             resolve(quizes)
           }).catch(err=>{
               mongoose.disconnect()
               reject(err)
           })
    
    })

}

exports.updatequestion = (q_id,question,cho1,cho2,cho3,correct)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return Question.updateOne({_id:q_id},{Question:question,A:cho1,B:cho2,C:cho3,Correct:correct})
            }).then((question)=>{
                mongoose.disconnect()
                
             resolve(question)
           }).catch(err=>{
               mongoose.disconnect()
               reject(err)
           })
    
    })
}


exports.deletquestion = (id)=>{

    return new Promise((resolve,reject)=>{
      mongoose.connect(DB_url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       return  Question.deleteOne({_id:id})
      }).then(()=>{
          console.log("question deleted")
        mongoose.disconnect();
        resolve("question deleted");
      }).catch(err=>{
          mongoose.disconnect();
          console.log(err)
          reject(err);
      })

    })
}