// pages/register/register.js
var app = getApp()
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		openId: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			openId: options.openId
		})
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

	// 用户点击注册
	formRegister: function (e) {
		http._post("/user",
				'nickname=' + e.detail.value.nickname +
				"&password=" + e.detail.value.password +
				"&phone=" + e.detail.value.phone +
				"&open_id=" + this.data.openId, 'application/x-www-form-urlencoded')
			.then(res => {
				wx.showToast({
					title: '注册成功',
					icon: 'none'
				})
				wx.navigateTo({
					url: '/pages/login/login'
				})
			})
			.catch(errRes => {
				wx.showToast({
					title: '注册失败! 请联系管理员',
					icon: 'none'
				})
			})
	},

	toLogin: function (e) {
		wx.navigateTo({
			url: '/pages/login/login',
			success: (result) => {

			}
		});
	}
})