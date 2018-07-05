const ListsModel = require('../model/lists')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

module.exports.getList = (req, res) => {
    const page = req.query.page;
    ListsModel.getList(page)
        .then((result) => {
            result.forEach((item) => {
                item.time = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
            })
            res.json({ code: 0, msg: 'ok', data: result })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}