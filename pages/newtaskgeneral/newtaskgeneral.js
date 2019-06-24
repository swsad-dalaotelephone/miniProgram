// pages/newtaskgeneral/newtaskgeneral.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task : {
      type: 'q',
      name: '',
      brief_info: '',
      required_count: 1,
      reward: 0,
      tag_id: 0,
    },
    tags: [{
      id: 1,
      name: '运动',
    }, {
      id: 2,
      name: '美食'
    }, {
      id: 3,
      name: '社会'
    }, {
      id: 4,
      name: '效率'
    }, {
      id: 5,
      name: '心理'
    }, {
      id: 6,
      name: '音乐'
    }
    ],


    position: 'left',
    
    task_types: ['问卷', '信息收集', '招募'],
    task_types_english: ['q', 'd', 'r'],
    type_index: 0,
    newTaskText: '发布任务',
    tag_names: ['运动','美食','社会','效率','心理','音乐'],
    current_tag: ''
  },

  bindTaskNameInput: function (e) {
    this.setData({
      'task.name': e.detail.value
    })
  },
  bindBriefInfoInput: function (e) {
    this.setData({
      'task.brief_info': e.detail.value
    })
  },

  handleRequiredCountChange({ detail }) {
    this.setData({
      'task.required_count': detail.value
    })
  },

  handleRewardChange({ detail }) {
    this.setData({
      'task.reward': detail.value
    })
  },

  handleTypeChange: function (e) {
    console.log('picker选择改变，携带值为', e.detail.detail.value)
    this.setData({
      type_index: e.detail.detail.value,
      'task.type': this.data.task_types_english[e.detail.detail.value]
    })
  },

  handleTagChange({ detail = {} }) {
    this.setData({
      'current_tag': detail.value
    });

    var index = this.data.tag_names.indexOf(detail.value);
    this.setData({
      'task.tag_id': index
    })
  },

  handleReturn: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  handleNextStep: function () {
    var task = this.data.task;
    if (task.name.length == 0) {
      wx.showToast({
        title: '任务名不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (task.brief_info.length == 0) {
      wx.showToast({
        title: '描述不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    console.log('task: ', this.data.task);
    if (task.type == "q") {
      wx.navigateTo({
        url: '/pages/newquestionnaire/newquestionnaire?task=' + JSON.stringify(task),
      })
    }
    else if (task.type == "d") {
      wx.navigateTo({
        url: '/pages/newcollect/newcollect?task=' + JSON.stringify(task),
      })      
    }
    else if (task.type == "r") {
      wx.navigateTo({
        url: '/pages/newrecruit/newrecruit?task=' + JSON.stringify(task),
      })            
    }
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