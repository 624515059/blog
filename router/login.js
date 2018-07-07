const UserModel = require('../model/user')
const sha1 = require('sha1')

module.exports = (req, res) => {
    const user = req.body.user;
    const pwd = req.body.pwd;
    UserModel.login({ user})
        .then((result) => {
            console.log(result);
            if (!result) {
                return res.json({ code: 1, msg: '用户不存在' })
            }
            // 检查密码是否匹配
            if (sha1(pwd) !== result.pwd) {
                return res.json({ code: 1, msg: '密码错误' })
            }
            req.session.user = 1;
            res.json({ code: 0, msg: 'ok' })
        })
        .catch(() => {
            res.json({ code: 1, msg: 'error' })
        })
}