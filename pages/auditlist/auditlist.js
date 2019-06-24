// pages/auditlist/auditlist.js
var app = getApp();
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		selectedTab: 0,
		taskName: "任务名称",
		auditList: [
			{	//TODO: example, to be deleted
				id: 0,
				selected: 0,
				submitter: "Name",
				type: 0, // 0:问卷; 1:招募; 2:信息收集
				status: 0,	// 0: 未审核; 1: 已审核
			},
			{	//TODO: example, to be deleted
				id: 0,
				selected: 0,
				submitter: "Name",
				type: 0, // 0:问卷; 1:招募; 2:信息收集
				status: 1,	// 0: 未审核; 1: 已审核
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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

	switchTab: function(e){
		this.setData({
			selectedTab: (this.data.selectedTab == 0)?1:0
		});
	}
})