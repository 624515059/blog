const express = require('express')
const router = express.Router()

router.post('/demo', require('./detail'))



module.exports =  router;