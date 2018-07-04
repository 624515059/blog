const ListsModel = require('../model/lists')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

module.exports.getAll = (req, res) => {
    ListsModel.getAll()
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

module.exports.del = (req, res) => {
    const _id = req.query.id;
    ListsModel.del({_id})
        .then((result) => {
            console.log(result)
            res.json({ code: 0, msg: 'ok', data: result })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}