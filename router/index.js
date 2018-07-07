const express = require('express')
const router = express.Router()

//新增文章页
router.post('/create', require('./posts').create)

//获取文章内容
router.get('/getOne', require('./posts').getOne)

//更新文章
router.post('/update', require('./posts').update)

//管理列表页
router.get('/getAll', require('./admin').getAll)

//删除
router.get('/del', require('./admin').del)

//前端列表
router.get('/getList', require('./lists').getList)

//前端详情页
router.get('/getDetail', require('./detail').getDetail)

//登录
router.post('/login', require('./login'))

module.exports =  router;