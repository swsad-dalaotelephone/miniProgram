// 开始login
var http = require("http.js")
var app = getApp()

function login(callback) {
	wx.showLoading()
	wx.login({
		success(res) {
			if (res.code) {
				// 登录成功，获取用户信息
				getUserInfo(res.code, callback)
			} else {
				// 否则弹窗显示，showToast需要封装
				showToast()
			}
		},
		fail() {
			showToast()
		}
	})
}

// 获取用户信息
function getUserInfo(code, callback) {
	wx.getUserInfo({
		// 获取成功，全局存储用户信息，开发者服务器登录
		success(res) {
			// 全局存储用户信息
			callback && callback(res.userInfo)
			// postLogin(code, res.iv, res.encryptedData, callback)
			wx.hideLoading()
			wx.navigateBack({
				url: '/pages/index/index',
			})
		},
		// 获取失败，弹窗提示一键登录
		fail() {
			wx.hideLoading()
			http._get("/user/weApp?code=" + code).then((res) => {
				console.log("succeed", res);
				//res.oepnId
				//res.msg
				if (res.openId) {
					// 获取到openId说明未注册, 跳转注册界面
					wx.navigateTo({
						url: '/pages/register/register?openId=' + res.openId
					})
				} else {
					// TODO: 获取到用户信息并保存 (cookie, 记得修改http.js)
				}
			})
			// 获取用户信息失败，清除全局存储的登录状态，弹窗提示一键登录
			// 使用token管理登录态的，清除存储全局的token
			// 使用cookie管理登录态的，可以清除全局登录状态管理的变量
			// store.commit('storeUpdateToken', '')
			// app.getUserInfo.userInfo=null
			// 获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录，后续会讲
		}
	})
}

// 开发者服务端登录
function postLogin(code, iv, encryptedData, callback) {
	let params = {
		code: code,
		iv: iv,
		encryptedData: encryptedData
	}
	request(apiUrl.postLogin, params, 'post').then((res) => {
		if (res.code == 1) {
			wx.hideLoading()
			// 登录成功，
			// 使用token管理登录态的，存储全局token，用于当做登录态判断，
			// 使用cookie管理登录态的，可以存任意变量当做已登录状态
			store.commit('storeUpdateToken', res.data.token)
			callback && callback()
		} else {
			showToast()
		}
	}).catch((err) => {
		showToast()
	})
}

// 判断是否登录
function isLogin(callback) {
	let userInfo = getApp().globalData.userInfo
	if (userInfo) {
		// 如果有全局存储的登录态，暂时认为他是登录状态
		callback && callback()
	} else {
		// 如果没有登录态，弹窗提示一键登录
		wx.navigateTo({
			url: '/pages/login/login',
		})
	}
}

// 显示toast弹窗
function showToast(content = '登录失败，请稍后再试') {
	wx.showToast({
		title: content,
		icon: 'none'
	})
}

module.exports = {
	login: login,
	isLogin: isLogin
}