// pages/auditlist/auditlist.js
var app = getApp();
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		selectedTab: 0,
		taskInfo: {
			name: "任务名称"
		},
		auditList: [
			{
				acceptance_id: "test1",
				accepter: "Name1",
				status: 1,	// 1: 未审核; 2: 已审核; 3: 已完成
			},
			{
				acceptance_id: "test2",
				accepter: "Name2",
				status: 2,	// 1: 未审核; 2: 已审核; 3: 已完成
			},
			{
				acceptance_id: "test3",
				accepter: "Name3",
				status: 3,	// 1: 未审核; 2: 已审核; 3: 已完成
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		// TODO: 从options读取任务id，现在暂时是写死
		let task_id = "5fae4333-f3ee-4a41-884e-85a3b738bcaa";
		http._get("/task/" + task_id)
			.then(res => {
				let taskInfo = JSON.parse(res.task)
				this.setData({
					taskInfo: taskInfo
				})
			})
			.catch(res => {
				wx.navigateBack({
					delta: 1
				});
				wx.showToast({
					title: '任务打开失败，咨询程序员小哥哥吧~',
					icon: 'none',
					duration: 1500,
					mask: false,
				});

			})

		http._get("/task/" + task_id + "/submittedTasks")
			.then(res => {
				let acceptanceArray = JSON.parse(res.submitted)
				this.setData({
					auditList: acceptanceArray
				})
			})
			.catch(res => {
				wx.navigateBack({
					delta: 1
				});
				wx.showToast({
					title: '任务打开失败，咨询程序员小哥哥吧~',
					icon: 'none',
					duration: 1500,
					mask: false,
				});
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

	switchTab: function (e) {
		this.setData({
			selectedTab: (this.data.selectedTab == 0) ? 1 : 0
		});
	},

	// 点击某个提交进行审核
	tapAudit: function (e) {
		let submitJson = JSON.stringify(e.currentTarget.dataset.item)
		let dest = ''
		switch (this.data.taskInfo.type) {
			case 'q':
				dest = 'auditquestionnaire'
				break;
			case 'd':
				dest = 'auditcollect'
				break;
			case 'r':
				dest = 'auditrecruit'
				break;
			default:
				break;
		}
		wx.navigateTo({
			url: '/pages/' + dest + '/' + dest + '?submitJson=' + submitJson,
		})
	}
})