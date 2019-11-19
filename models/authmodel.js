const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DB_url = "mongodb+srv://ibrahemhosny:hosny012@cluster0-ntfx4.mongodb.net/online-quiz?retryWrites=true&w=majority"



const userschema = mongoose.Schema({
    T_name: String,
    Email : String,
    password : String,
    Type : String

})

const User = mongoose.model('user',userschema )


// to signup user teacher and student
exports.SaveUser= (name,email,passowrd,type)=>{

    return new Promise((resolve,reject)=>{
   mongoose.connect(DB_url,{useNewUrlParser:true , useNewUrlParser : true}).then(()=>{
       return User.findOne({Email:email})
   }).then((user)=>{
       if(user)
       {
           mongoose.disconnect()
           reject("Email ready exist")
       }
       else
       {
           return bcrypt.hash(passowrd,10)
       }
   }).then((hashpassword)=>{
       let user = new User({
           T_name:name,
           Email:email,
           password:hashpassword,
           Type:type
       })
       return user.save()
      
   }).then(()=>{
    mongoose.disconnect()
    resolve()
   }).catch(err=>{
       reject(err)
       mongoose.disconnect()
   })

    })
  
 
}

// check if user is regester to login 
exports.checkUser=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_url,{useNewUrlParser : true , useUnifiedTopology : true}).then(()=>
         User.findOne({Email :email})
        ).then(user=>{
            if(!user)
            {  console.log(user+"11111111111111111")
                mongoose.disconnect()
                reject('Email not exist')
               
            }
            else {
                console.log(user+"22222222222222222222222222")
                console.log(user.password)
                console.log(password)
               bcrypt.compare(password,user.password).then(same=>{
            
                if(!same)
                {  console.log(user+"3333333333333333333333333333")
                    mongoose.disconnect()
                    reject('pass is in correct')
                }
                else
                {console.log(user+"44444444444444")
                    mongoose.disconnect()
                    console.log("on model before resolve"+user._id)
                   resolve(user) 
                }  
        
           })
            }
            
            
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}