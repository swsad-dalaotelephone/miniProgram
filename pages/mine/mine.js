var utils = require('../../utils/handleLogin.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    current: 'minepage'
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },
  //事件处理函数
  // onShow: function () {
  //   utils.isLogin(() => {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   })
  // }

  onLoad: function (options) {
    
    // TODO: 回调地狱
    wx.login({
      success: res => {
        console.log('code is:' + res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.host + '/weAppLogin?code='+res.code,
          method: 'GET',
          success: function (res) {
            console.log("login succeed.",res.data);
          }
        })
        
      },
      fail: res => {
        console.log(res.errMsg)
      }
    })
  }
})