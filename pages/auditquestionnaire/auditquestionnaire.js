// pages/auditquestionnaire/auditquestionnaire.js
var app = getApp();
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		submitItem: {
			acceptance_id: "",
			accepter: "",
			accepter_id: "",
			answer: [],
			feedback: "",
			status: 0,
			task_id: ""
		},
		feedbackInput: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let submitItem = JSON.parse(options.submitJson)
		this.setData({
			submitItem: submitItem
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

	inputFeedback: function (e) {
		this.setData({
			feedbackInput: e.detail.value
		})
	},

	tapNo: function (e) {

		let feedbackInput = this.data.feedbackInput
		if (feedbackInput.length > 0) {
			let url = '/task/' + this.data.submitItem.task_id + '/acceptance/result'
			
			console.log("测试url",url)
			let result = 'accepter_id=' + this.data.submitItem.accepter_id + '&result=false&feedback=' + this.data.feedbackInput
			http._put(url, result, 'application/x-www-form-urlencoded')
				.then(res => {
					wx.showToast({
						title: '审核成功',
						icon: 'none',
						duration: 1500,
						mask: false,
					})
					wx.navigateBack({
						delta: 1
					})
				})
				.catch(res => {
					wx.showToast({
						title: '审核出现错误，请联系客服',
						icon: 'none',
						duration: 1500,
						mask: false,
					})
				})
		} else {
			wx.showToast({
				title: '审核不通过需填写反馈',
				icon: 'none',
				duration: 1500,
				mask: false,
			});
		}
	},

	tapYes: function (e) {
		let url = '/task/' + this.data.submitItem.task_id + '/acceptance/result'
		let result = 'accepter_id=' + this.data.submitItem.accepter_id + '&result=true&feedback=' + this.data.feedbackInput
		http._put(url, result, 'application/x-www-form-urlencoded')
			.then(res => {
				wx.showToast({
					title: '审核成功',
					icon: 'none',
					duration: 1500,
					mask: false,
				})
				wx.navigateBack({
					delta: 1
				})
			})
			.catch(res => {
				wx.showToast({
					title: '审核出现错误，请联系客服',
					icon: 'none',
					duration: 1500,
					mask: false,
				})
			})
	}
})