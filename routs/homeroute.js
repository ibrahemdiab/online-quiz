const homecontroller = require('../controllers/homecontroller')

const router = require('express').Router()

router.get('/',homecontroller.gethome)

module.exports = router