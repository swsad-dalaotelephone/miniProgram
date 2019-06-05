//index.js

//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')

Page({
  data: {
    background: ['../../images/home1.jpg', '../../images/home2.png', '../../images/home3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    taskList: []
  },

  //事件处理函数
  onLoad: function() {
    http._get('/task/getRecommendTasks').then(res => {
      console.log(JSON.parse(res.tasks))
      this.setData({
        taskList:JSON.parse(res.tasks)
      })
    }).catch(e => {
      console.log(e)
    })
  },
  handletap: function(e) {
    app.globalData.currentTask = e.currentTarget.dataset.name
    wx.switchTab({
      url: '/pages/task/task'
    })
  },
  handleAddButton: function() {
    wx.navigateTo({
      url: '/pages/newtask/newtask',
    })
  },
  openReceive: function(e) {
    wx.navigateTo({
      url: '/pages/receive/receive?item='+JSON.stringify(e.currentTarget.dataset.item)
    })
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

})