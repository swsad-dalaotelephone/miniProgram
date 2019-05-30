// pages/newrecruit/newrecruit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task_type: '招募',
    description: '',
    location: '',
    contact: '',
    start_date: '2019-05-01',
    end_date: '2019-09-30'
  },
  bindDescriptionInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  bindLocationInput: function (e) {
    this.setData({
      location: e.detail.value
    })
  },
  handleReturn: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_date: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_date: e.detail.value
    })
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
    this.setData({
      typeName: app.globalData.currentTask
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
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
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

  }
})