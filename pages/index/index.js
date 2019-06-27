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
    taskList: [],
    taskList1: [],
    taskList2: [],
    taskList3: []
  },

  //事件处理函数
  onLoad: function() {
    
  },
  onShow: function() {
    this.loadLists()
  },
  handleAddButton: function() {
    wx.navigateTo({
      url: '/pages/newtaskgeneral/newtaskgeneral',
    })
  },
  openReceive: function(e) {
    wx.navigateTo({
      url: '/pages/review/review?id='+e.currentTarget.dataset.item.id
    })
  },
  loadLists: function() {
    http._get('/user/recommendedTasks').then(res => {
      let tasks = JSON.parse(res.tasks)
      let tasks1 = [], tasks2 = [], tasks3 = []
      tasks.forEach(item => {
        switch (item.type) {
          case 'q':
            tasks1.push(item)
            break;
          case 'd':
            tasks2.push(item)
            break;
          case 'r':
            tasks3.push(item)
            break;
          default:
            break;
        }
      })
      this.setData({
        taskList: tasks,
        taskList1: tasks1,
        taskList2: tasks2,
        taskList3: tasks3
      })
    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.loadLists()
    wx.stopPullDownRefresh()
  },

})