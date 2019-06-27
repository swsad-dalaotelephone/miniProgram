const app = getApp()
const http = require('../../utils/http.js')

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		current: 'minepage'
	},
	handleChange({
		detail
	}) {
		this.setData({
			current: detail.key
		});
	},

	onLoad: function (options) {
		// TODO: 获取用户信息, 注册时默认注册为微信名
		http._get("/user/profile")
			.then(res => {
				console.log(res)
			})
			.catch(res => {

			})
	}
})