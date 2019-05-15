// pages/task/task.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeName: '问卷',
    taskList: [],
    text1: '',
    text2: '',
    taskList1: [{
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1',
        status: '未完成'
      },
      {
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1'
      }
    ],
    taskList2: [{
      title: 'task1',
      time: 'time1',
      location: 'location1',
      price: '1',
      status: '已完成'
    },
    {
      title: 'task1',
      time: 'time1',
      location: 'location1',
      price: '1'
    }
    ],
  },
  handleReturn: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  handleAddButton: function() {
    wx.navigateTo({
      url: '/pages/newtask/newtask',
    })
  },

  handleTap1: function(e) {

    this.setData({
      taskList: this.data.taskList1,
      text1: 'active',
      text2: 'no-active'
    })
  },

  handleTap2: function (e) {
    this.setData({
      taskList: this.data.taskList2,
      text1: 'no-active',
      text2: 'active'
    })
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