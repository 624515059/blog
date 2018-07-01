const express = require('express')
const router = express.Router()

//新增文章页
router.post('/create', require('./posts'))

//管理列表页
router.get('/getAll', require('./admin'))


module.exports =  router;