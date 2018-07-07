const config = require('config-lite')(__dirname)
const mongoose = require('mongoose')

mongoose.connect(config.mongodb)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  ()=> {
    console.log("数据库成功打开");
});

//创建一个User模型。 语法mongoose.model(模型名字，Schema);
//这里省略了一步，就是schema是通过new mongoose.schema({})创建的。
//https://blog.csdn.net/love4Mario/article/details/52171052  查询自己创建的表
exports.User = mongoose.model('User', {
    user: { type: 'string', required: true },
    pwd: { type: 'string', required: true }
}, 'user')

exports.Lists = mongoose.model('Lists', {
    title: { type: 'string', required: true },
    content: { type: 'string', required: true }
})