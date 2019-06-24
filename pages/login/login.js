// pages/login.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//判断小程序的API，回调，参数，组件等是否在当前版本可用。
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {

	},
	bindGetUserInfo: function (e) {
		if (e.detail.userInfo) {
			//用户按了允许授权按钮
			var that = this;
			//插入登录的用户的相关信息到数据库
			// wx.request({
			//   url: getApp().globalData.urlPath + 'hstc_interface/insert_user',
			//   data: {
			//     openid: getApp().globalData.openid,
			//     nickName: e.detail.userInfo.nickName,
			//     avatarUrl: e.detail.userInfo.avatarUrl,
			//     province: e.detail.userInfo.province,
			//     city: e.detail.userInfo.city
			//   },
			//   header: {
			//     'content-type': 'application/json'
			//   },
			//   success: function (res) {
			//     //从数据库获取用户信息
			//     that.queryUsreInfo();
			//     console.log("插入小程序登录用户信息成功！");
			//   }
			// });
			app.globalData.userInfo = e.detail.userInfo
			//授权成功后，跳转进入小程序首页
			wx.navigateBack({
				url: '/pages/index/index'
			})
		} else {
			//用户按了拒绝按钮
			wx.showModal({
				title: '警告',
				content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
				showCancel: false,
				confirmText: '返回授权',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击了“返回授权”')
					}
				}
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	// 用户点击登陆
	formLogin: function (e) {
		http._post("/user/session",
				"&phone=" + e.detail.value.phone +
				"&password=" + e.detail.value.password, 'application/x-www-form-urlencoded')
			.then(res => {
				wx.navigateBack({
					delta: 1
				  })
				wx.showToast({
					title: '登陆成功',
					icon: 'none'
				})
				
			})
			.catch(res => {
				console.log("错误", res)
				if(res.statusCode == '400'){
					wx.showToast({
						title: '手机号或密码错误',
						icon: 'none'
					})
				} else {
					wx.showToast({
						title: '未知错误',
						icon: 'none'
					})
				}

			})
	}
})