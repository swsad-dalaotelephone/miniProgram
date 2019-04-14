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
  onShow: function () {
    utils.isLogin(() => {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    })
  }
})