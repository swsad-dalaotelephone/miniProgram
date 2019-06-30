// pages/editprofile/editprofile.js
const app = getApp()
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nickname: "",
		date: '2000-01-01',
		gradeIndex: 0,
		grades: ['大一', '大二', '大三', '大四'],
		campusIndex: 0,
		campus: [
			'广州校区南校园',
			'广州校区东校园',
			'广州校区北校园',
			'珠海校区',
			'深圳校区'
		],
		schoolIndex: 0,
		school: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// TODO: 获取资源
		// TODO: 获取用户信息
		http._get('/resource/schools')
			.then(res => {
				var schools = new Array()
				JSON.parse(res.schools).forEach(e => {
					schools.push(e.name)
				})
				this.setData({
					schools: schools
				})
				return http._get('/resource/campuses')
			})
			.then(res => {
				var campuses = new Array()
				JSON.parse(res.campuses).forEach(e => {
					campuses.push(e.name)
				})
				this.setData({
					campuses: campuses
				})
				return http._get('/user/profile')
			})
			.then(res => {
				console.log(res)
				this.setData({
					userInfo: JSON.parse(res.user)
				})
				for(var i = 0; i < this.data.grades.length; i++){
					if(this.data.grades[i] == this.data.userInfo.grade){
						this.setData({
							gradeIndex: i
						})
						break
					}
				}
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

	bindNameChange: function (e) {
		var temp = this.data.userInfo
		temp.nick_name = e.detail.value
		this.setData({
			userInfo: temp
		})
	},

	bindDateChange: function (e) {
		var temp = this.data.userInfo
		temp.birthday = e.detail.value
		this.setData({
			userInfo: temp
		})
	},

	bindGradeChange: function (e) {

		var temp = this.data.userInfo
		temp.grade = this.data.grades[e.detail.value]
		console.log(e.detail.value)
		this.setData({
			userInfo: temp,
			gradeIndex: e.detail.value
		})
	},

	bindSchoolChange: function (e) {
		console.log(e.detail.value)
		var temp = this.data.userInfo
		temp.school_id = parseInt(e.detail.value) + 1
		this.setData({
			userInfo: temp
		})
	},

	bindCampusChange: function (e) {
		console.log(e.detail.value)
		var temp = this.data.userInfo
		temp.campus_id = parseInt(e.detail.value) + 1
		this.setData({
			userInfo: temp
		})
	},

	formSave: function (e) {
		// console.log("haha")
		// let params = "nick_name="+e.detail.value.nickname
		// console.log(params)
		// http._post("/user/profile", params, 'application/x-www-form-urlencoded')
		// 	.then(res=>{
		// 		console.log(res)
		// 	})
		// 	.catch(res=>{
		// 		console.log(res)
		// 	})
		var temp = this.data.userInfo
		temp.preferences = []
		console.log(temp)
		http._post("/user/profile", temp, 'application/json')
			.then(res => {
				wx.showToast({
					title: '资料更新成功!',
					duration: 1500
				})
			})
			.catch(res => {
				wx.showToast({
					title: '资料更新异常!',
					duration: 1500
				})
				console.log('Update profile error:', res)
			})
	}
})