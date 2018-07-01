const ListsModel = require('../model/lists')

module.exports = (req, res) => {

    ListsModel.getAll()
        .then(function (result) {
            console.log(result);
            res.json({ code:1, data: result })
        })
        .catch(() => {
            res.json({ code: 2 })
        })

}