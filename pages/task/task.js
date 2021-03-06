// pages/task/task.js
var app = getApp()
const http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeName: '问卷',
    isPublish: false,
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

  openReview: function(e) {
    if (this.data.isPublish) {
      wx.navigateTo({
        url: '/pages/auditlist/auditlist?id=' + e.currentTarget.dataset.item.id
      })      
    }
    else {
      wx.navigateTo({
        url: '/pages/review/review?id=' + e.currentTarget.dataset.item.id,
      })
    }

  },

  handleTap1: function(e) {
    this.setData({
      isPublish: false
    })
  },

  handleTap2: function (e) {
    this.setData({
      isPublish: true
    })
    console.log(this.data.publishedTasks)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    http._get('/user/publishedTasks').then(res => {
      // console.log(JSON.parse(res.tasks))
      this.setData({
        publishedTasks: JSON.parse(res.tasks)
      })
    }).catch(e => {
      console.log(e)
    })
    http._get('/user/acceptedTasks').then(res => {
      let data = JSON.parse(res.accepted)
      console.log(data)
      let tempList = []
      data.forEach(item => {
        item.task.status = item.acceptance.status
        tempList.push(item.task)
      })
      this.setData({
        acceptedTasks: tempList
      })
    }).catch(e => {
      console.log(e)
    })
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