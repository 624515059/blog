const marked = require('marked')
const Lists = require('./db').Lists

module.exports = {

    // 创建一篇文章
    create(list) {
        return Lists.create(list)
    },
    //获取文章列表
    getAll(){
        return Lists.find().lean()
    },
    //删除文章
    del(obj){
        return Lists.remove(obj)
    }

}