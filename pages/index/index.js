//index.js

//获取应用实例
const app = getApp()

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
    iconList: [{
      icon: 'brush_fill',
      name: '问卷'
    }, {
      icon: 'document_fill',
      name: '信息收集'
    }, {
      icon: 'group_fill',
      name: '招募'
    }, {
      icon: 'service_fill',
      name: '物流'
    }],
    taskList: [{
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1',
        type: '1',
        intro: '介绍'
      },
      {
        title: 'task2',
        time: 'time1',
        location: 'location1',
        price: '1',
        type: '0'
      },
      {
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1'
      },
      {
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1'
      },
      {
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1'
      },
      {
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1'
      },
      {
        title: 'task1',
        time: 'time1',
        location: 'location1',
        price: '1'
      }
    ]
  },

  //事件处理函数
  onLoad: function() {

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
    console.log(e)
    wx.navigateTo({
      url: '/pages/receive/receive',
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