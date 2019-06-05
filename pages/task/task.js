// pages/task/task.js
var app = getApp()
const http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeName: '问卷',
    isPublish: true,
    taskList: [],
    text1: '',
    text2: '',
    publishedTasks: [],
    acceptedTasks: [],
  },
  handleReturn: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  handleAddButton: function() {
    wx.navigateTo({
      url: '/pages/newtaskgeneral/newtaskgeneral',
    })
  },

  handleTap1: function(e) {
    this.setData({
      taskList: this.data.acceptedTasks,
      text1: 'active',
      text2: 'no-active'
    })
  },

  handleTap2: function (e) {
    this.setData({
      taskList: this.data.publishedTasks,
      text1: 'no-active',
      text2: 'active'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    http._get('/task/getPublishedTasks').then(res => {
      console.log(JSON.parse(res.tasks))
      this.setData({
        publishedTasks: JSON.parse(res.tasks)
      })
    }).catch(e => {
      console.log(e)
    })
    http._get('/task/getAcceptedTasks').then(res => {
      console.log(JSON.parse(res.tasks))
      this.setData({
        acceptedTasks: JSON.parse(res.tasks)
      })
    }).catch(e => {
      console.log(e)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      taskList: this.data.taskList1,
      text1: 'active',
      text2: 'no-active'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})