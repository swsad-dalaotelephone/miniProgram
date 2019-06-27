// pages/wechatlogin/wechatlogin.js
const app = getApp()
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// TODO: 如果能获取用户信息和cookie就直接跳转index
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	bindGetUserInfo: function (e) {
		console.log(e.detail);
		if (e.detail.userInfo) {
			
			if (wx.getStorageSync("baobaozhuan_cookie")) { 
				// cookie存在直接跳转主页
				wx.switchTab({
					url: '/pages/index/index'
				});
				  
			} else {
				wx.login({
					success(res) {
						http._get("/user/weApp?code=" + res.code).then((res) => {
							console.log("succeed", res);
							if (res['open_id']) {
								// 获取到openId说明未注册, 跳转注册界面
								wx.navigateTo({
									url: '/pages/register/register?openId=' + res.open_id
								})
							} else {
								// 否则跳转登录界面
								wx.navigateTo({
									url: '/pages/login/login'
								})
							}
						}).catch(res => console.log(res))
					},
					fail() {
						wx.showToast({
							title: '登录异常，请联系客服',
							duration: 1500,
							mask: false,
						});
					}
				})

				// 后台检查账号是否存在
				
			}
		}
	}
})