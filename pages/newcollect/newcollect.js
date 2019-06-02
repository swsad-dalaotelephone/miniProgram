// pages/newcollect/newcollect.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task_type: '信息收集',
    requirement: '',
    contact: ''
  },
  bindRequirementInput: function (e) {
    this.setData({
      requirement: e.detail.value
    })
  },
  bindContactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  handleNextStep: function () {
    wx.navigateTo({
      url: '/pages/scope/scope'
    })
  }, 
  handleReturn: function () {
    wx.switchTab({
      url: '/pages/index/index',
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