module.exports = {
	//判断是否登录
	checkLogin(req, res, next) {
		if (!req.session.user) {
			return res.json({ code: -5, msg: '无权限' })
		}
		next()
	},
	//退出登录
	checkOut(req, res, next){
		req.session.user = null;
		return res.json({ code: 0, msg: '退出成功' })
	}
}