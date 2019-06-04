//app.js
var utils = require("utils/handleLogin.js")
App({
  onLaunch: function () {
    var that=this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    utils.login((userInfo)=>{
      this.globalData.userInfo=userInfo
    })
  },
  globalData: {
    userInfo: null,
    currentTask: '问卷',
    host: 'https://api.baobaozhuan.cn'
  },
  mergeTaskInfo: function(obj, ref){
    
  }
})