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

	},

	onShow: function(){
		http._get("/user/profile")
			.then(res => {
				let userInfo = JSON.parse(res.user)
				console.log(userInfo)
				this.setData({
					userInfo: userInfo
				})
			})
			.catch(res => {

			})
	},

	editProfile: function(e){
		wx.navigateTo({
			url: '/pages/editprofile/editprofile',
			success: (result) => {
				
			},
			fail: () => {},
			complete: () => {}
		});
		  
	}
})