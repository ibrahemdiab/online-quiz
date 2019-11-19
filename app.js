const express = require('express')
const bodyparser = require('body-parser')
const authroute = require('./routs/authRoutes')
const homeroute = require('./routs/homeroute')
const creatQuizerout = require('./routs/creatQuizerout')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')

const SessionStore =require('connect-mongodb-session')(session)

const app = express()
const STORE = new SessionStore({
    uri : "mongodb+srv://ibrahemhosny:hosny012@cluster0-ntfx4.mongodb.net/online-quiz?retryWrites=true&w=majority",
    collection : 'session'
})

app.use(session({
    secret : 'jfkjefejienwodwqkdmwknfi',
    saveUninitialized : false,
   store:STORE
}))



app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

app.set('view engine','ejs')
app.set('views','views')
app.use(flash())

app.use('/',authroute)
app.use('/',homeroute)
app.use('/',creatQuizerout)
const port = process.env.PORT || 3000;
app.listen(port,(err)=>{
    console.log("server is listen on port 3000")
})