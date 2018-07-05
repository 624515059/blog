const ListsModel = require('../model/lists')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const marked = require('marked')


module.exports.getDetail = (req, res) => {
    let  _id = req.query.id;
    ListsModel.getDetail({_id})
        .then((result) => {
            result.forEach((item) => {
                item.time = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
                item.mdContent = marked(item.content)
            })
            res.json({ code: 0, msg: 'ok', data: result })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}