const Lists = require('./db').Lists

module.exports = {

    // 创建一篇文章
    create(list) {
        return Lists.create(list)
    },
    //获取文章列表
    getAll(){
        return Lists.find().sort({ '_id': -1 }).lean()
    },
    //获取一篇文章
    getOne(_id) {
        return Lists.findById(_id)
    },
    //删除文章
    del(obj){
        return Lists.remove(obj)
    },
    //更新文章 查找条件 更新后数据
    update(wherestr, updatestr){
        return Lists.update(wherestr, updatestr)
    },
    //获取前端页面文章列表
    getList(page){
        return Lists.find()
            .skip(page * 5)
            .limit(5)
            .sort({ '_id': -1 })
        .lean()
    },
    //前端详情
    getDetail(_id){
        return Lists.find(_id).lean()
    }

}