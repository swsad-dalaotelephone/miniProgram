// pages/newrecruit/newrecruit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task: {
      type: 'r',
      content: {
        description: '',
        start_time:'2019-06-15 20:53:00',
        end_time: '2019-06-20 21:00:00',
        location: '',
        participant_info: []
      }
    },
    task_type: '招募',
  },

  bindStartTimeChange({detail}) {
    this.setData({
      'task.content.start_time': detail
    })
  },
  bindEndTimeChange({ detail }) {
    this.setData({
      'task.content.end_time': detail
    })
  },

  bindDescriptionInput: function (e) {
    this.setData({
      'task.content.description': e.detail.value
    })
  },
  bindLocationInput: function (e) {
    this.setData({
      'task.content.location': e.detail.value
    })
  },
  handleReturn: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  handleDeleteQuestion: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除此问题？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          var index = e.currentTarget.dataset.index;
          var newQuestionList = that.data.task.content.participant_info;
          console.log(newQuestionList);
          newQuestionList.splice(index, 1);
          console.log(newQuestionList);
          that.setData({
            'task.content.participant_info': newQuestionList
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },

  handleAddText: function () {
    var newQuestionList = this.data.task.content.participant_info;
    console.log(newQuestionList);
    var new_id = newQuestionList.length == 0 ? 1 : newQuestionList[newQuestionList.length - 1].id + 1;
    newQuestionList.push({
      type: 'text',
      content: '',
      id: new_id
    });
    console.log(newQuestionList);
    this.setData({
      'task.content.participant_info': newQuestionList
    });
  },

  handleAddChoice: function () {
    var newQuestionList = this.data.task.content.participant_info;
    console.log(newQuestionList);
    var new_id = newQuestionList.length == 0 ? 1 : newQuestionList[newQuestionList.length - 1].id + 1;
    newQuestionList.push({
      type: 'choice',
      content: '',
      options: [{
        content: '',
        index: 'A'
      },
      {
        content: '',
        index: 'B'
      },
      ],
      id: new_id
    });
    console.log(newQuestionList);
    this.setData({
      'task.content.participant_info': newQuestionList
    });
  },

  handleAddOption: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var newQuestionList = this.data.task.content.participant_info;
    console.log(newQuestionList);
    var cur_options = newQuestionList[index].options.length;
    console.log(cur_options);
    newQuestionList[index].options.push({
      content: '',
      index: String.fromCharCode(cur_options + 65)
    });
    console.log(newQuestionList);

    this.setData({
      'task.content.participant_info': newQuestionList
    });
  },

  handleDeleteOption: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var newQuestionList = this.data.task.content.participant_info;
    console.log(newQuestionList);
    var cur_options = newQuestionList[index].options.length;
    console.log(cur_options);
    newQuestionList[index].options.splice(cur_options - 1, 1);
    console.log(newQuestionList);


    this.setData({
      'task.content.participant_info': newQuestionList
    });
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
  handleNextStep: function () {
    var task = this.data.task;
    if (task.content.description.length == 0) {
      wx.showToast({
        title: '活动描述不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }  
    if (task.content.location.length == 0) {
      wx.showToast({
        title: '活动地点不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }  
    var start_time = new Date(task.content.start_time);
    var end_time = new Date(task.content.end_time);
    if (start_time > end_time) {
      wx.showToast({
        title: '开始时间不能晚于结束时间',
        icon: 'none',
        duration: 2000
      });
      return;      
    }

    var questions = task.content.participant_info;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].title.length == 0) {
        wx.showToast({
          title: '题目' + (i + 1) + '不能为空',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (questions[i].type == 'choice') {
        var options = questions[i].options;
        for (var j = 0; j < options.length; j++) {
          if (options[j].content.length == 0) {
            wx.showToast({
              title: '题目' + (i + 1) + '选项' + options[j].index + '不能为空',
              icon: 'none',
              duration: 2000
            });
            return;
          }
        }
      }
    }
  
    wx.navigateTo({
      url: '/pages/scope/scope?task=' + JSON.stringify(task),
    })
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