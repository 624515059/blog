const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const checkOut = require('../middlewares/check').checkOut

//新增文章页
router.post('/create', checkLogin, require('./posts').create)

//获取文章内容
router.get('/getOne', checkLogin, require('./posts').getOne)

//更新文章
router.post('/update', checkLogin, require('./posts').update)

//管理列表页
router.get('/getAll', checkLogin, require('./admin').getAll)

//删除
router.get('/del', checkLogin, require('./admin').del)

//前端列表
router.get('/getList', require('./lists').getList)

//前端详情页
router.get('/getDetail', require('./detail').getDetail)

//登录
router.post('/login', require('./login'))

//退出
router.get('/out', checkOut)


module.exports = router;