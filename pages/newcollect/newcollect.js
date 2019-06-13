// pages/newcollect/newcollect.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task_type: '信息收集',
    task: {
      type: 'd',
      content: {
        data_des: '',
        submit_way: ''
      }
    }
  },
  bindRequirementInput: function (e) {
    this.setData({
      'task.content.data_des': e.detail.value
    })
  },
  bindContactInput: function (e) {
    this.setData({
      'task.content.submit_way': e.detail.value
    })
  },
  handleNextStep: function () {
    var task = this.data.task;
    if (task.content.data_des == 0) {
      wx.showToast({
        title: '要求不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (task.content.submit_way.length == 0) {
      wx.showToast({
        title: '提交方式不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }    
    wx.navigateTo({
      url: '/pages/scope/scope?task=' + JSON.stringify(task),
    })
  }, 
  handleReturn: function () {
    wx.navigateBack({
      delta: 1
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.task != "undefined") {
      var new_task = JSON.parse(options.task);
      console.log("new_task: ", new_task);
      var comm = require('../../utils/common.js');
      var task = this.data.task;
      comm.mergeTaskInfo(task, new_task);
      console.log("task: ", task);
      this.setData({
        task: task
      })
    }
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