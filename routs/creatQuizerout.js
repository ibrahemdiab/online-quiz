const router = require('express').Router()
const creatQuizecontroller = require('../controllers/creatQuizecontroller')
const teacherAuth = require('./guards/teacherauth')
const bodyparser = require('body-parser')

router.get('/creatQuize',teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.getCreatQuize)
router.get('/creatQuize/:star',teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.getCreatQuizestar)
router.post('/creatQuize',teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.postCreatQuize)
router.get('/allquizes',bodyparser.urlencoded({extended:true}),creatQuizecontroller.getAllQuizes)
router.get("/publishQuiz/:quizeid",teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.publishQuiz)

router.get("/deletqestion/:questionid",teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.deletquestion)
router.get("/deletqestion/:questionid/:quizeid/:name/:time",teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.deletquestion)

router.get("/quizeQuestions/:quizeid/:name/:time",teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.getquestionsbyquizeid)
router.post('/savequestion',teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.savequestion)

router.get('/savedquizes',teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.getSavedquizes)
router.get('/publishedquizes',teacherAuth.teacherAuth,bodyparser.urlencoded({extended:true}),creatQuizecontroller.getpublishedquizes)

module.exports = router