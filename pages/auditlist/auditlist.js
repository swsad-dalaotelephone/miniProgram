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
		auditList: [{
				acceptance_id: "test1",
				accepter: "Name1",
				status: 1, // 1: 未审核; 2: 已审核; 3: 已完成
			},
			{
				acceptance_id: "test2",
				accepter: "Name2",
				status: 2, // 1: 未审核; 2: 已审核; 3: 已完成
			},
			{
				acceptance_id: "test3",
				accepter: "Name3",
				status: 3, // 1: 未审核; 2: 已审核; 3: 已完成
			}
		],
		detailList: [{
				title: '活动描述',
				detail: '一段不走心的活动描述'
			},
			{
				title: '活动描述',
				detail: '一段不走心的活动描述'
			},
		],
		task_id: ''
	},
	openStat: function () {
		let task = this.data.taskInfo;
		console.log('task', task);
		if (task.type == 'q') {
			wx.navigateTo({
				url: '/pages/statistic/statistic?task=' + JSON.stringify(task)
			})
		}

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let task_id = '';
		if (typeof options.id != 'undefined') {
			task_id = options.id;
		} else {
			// TODO: report error
		}
		console.log('task_id: ', task_id);
		this.setData({
			task_id: task_id
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
		let task_id = this.data.task_id
		http._get("/task/" + task_id)
			.then(res => {
				let taskInfo = JSON.parse(res.task)
				this.setData({
					taskInfo: taskInfo
				})
				this.renderTask(taskInfo)
			})
			.catch(res => {
				wx.switchTab({
					url: '/pages/task/task',
				})
				wx.showToast({
					title: '任务打开失败，咨询程序员小哥哥吧~',
					icon: 'none',
					duration: 1500,
					mask: false,
				})

			})

		http._get("/task/" + task_id + "/submittedTasks")
			.then(res => {
				let acceptanceArray = JSON.parse(res.submitted)
				this.setData({
					auditList: acceptanceArray
				});
				console.log('receive acceptanceArray: ', acceptanceArray);
			})
			.catch(res => {
				wx.switchTab({
					url: '/pages/task/task',
				})
				wx.showToast({
					title: '任务打开失败，咨询程序员小哥哥吧~',
					icon: 'none',
					duration: 1500,
					mask: false,
				})
			})

	},

	renderTask(taskInfo) {
		var detailList = []
		switch (taskInfo.type) {
			case 'r':
				detailList = [{
					title: '活动描述',
					detail: taskInfo.content.recruit_des
				}, {
					title: '活动时间',
					detail: taskInfo.content.start_time + taskInfo.content.end_time
				}, {
					title: '活动地点',
					detail: taskInfo.content.location
				}, {
					title: '活动报酬',
					detail: taskInfo.required_count
				}]
				break;
			case 'q':
				detailList = [{
					title: '问卷描述',
					detail: taskInfo.content.quest_des
				}, {
					title: '问卷报酬',
					detail: taskInfo.reward
				}, {
					title: '问卷预计份数',
					detail: taskInfo.required_count
				}]
				break;
			case 'd':
				detailList = [{
					title: '信息收集描述',
					detail: taskInfo.content.data_des
				}, {
					title: '报酬',
					detail: taskInfo.reward
				}, {
					title: '需要份数',
					detail: taskInfo.required_count
				}]
				break;
			default:
				break;
		}
		this.setData({
			detailList: detailList
		})
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
		let transferObj = {
			submitInfo: e.currentTarget.dataset.item,
			taskInfo: this.data.taskInfo
		}
		let transferJson = JSON.stringify(transferObj)
		wx.navigateTo({
			url: '/pages/audit/audit?info=' + transferJson,
		})
	},

	// 终止任务
	endTask: function (e) {
		let task_id = this.data.task_id
		http._put("/task/" + task_id + "/status")
			.then(res => {
				wx.showToast({
					title: '任务已成功终止',
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
					title: '终止任务失败，请联系管理员',
					icon: 'none',
					duration: 1500,
					mask: false,
				})
			})
	},

	handleReturn: function(e){
		wx.navigateBack({
			delta: 1,
		})
	}
})