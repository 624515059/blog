const ListsModel = require('../model/lists')

module.exports.create = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    //参数校验忽略...
    ListsModel.create({ title, content })
        .then(function (result) {
            console.log(result);
            res.json({ code: 0, msg: '发表成功' })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}

module.exports.getOne = (req, res) => {
    const _id = req.query.id;
    ListsModel.getOne({ _id })
        .then(function (result) {
            console.log(result);
            res.json({ code: 0, msg: 'ok', data: result })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}

module.exports.update = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const _id = req.body.id;
    ListsModel.update({ _id }, { $set: { title, content } })
        .then(function (result) {
            console.log(result);
            res.json({ code: 0, msg: '修改成功' })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}