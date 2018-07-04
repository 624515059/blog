const ListsModel = require('../model/lists')

module.exports = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    //参数校验忽略...
    ListsModel.create({ title, content })
        .then(function (result) {
            console.log(result);
            res.json({ code: 0, msg: 'ok' })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}