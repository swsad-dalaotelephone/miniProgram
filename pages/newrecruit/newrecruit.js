// pages/newrecruit/newrecruit.js
var app = getApp()
var kTypeChoice = 'm';
var kTypeText = 'f';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    kTypeChoice: kTypeChoice,
    kTypeText: kTypeText,
    task: {
      type: 'r',
      content: {
        recruit_des: '',
        start_time:'2019-06-15 20:53:00',
        end_time: '2019-06-20 21:00:00',
        location: '',
        participant_info: []
      }
    },
    task_type: '招募',
    questions: []
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
      'task.content.recruit_des': e.detail.value
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
          var newQuestionList = that.data.questions;
          
          newQuestionList.splice(index, 1);
          
          that.setData({
            'questions': newQuestionList
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },

  handleAddText: function () {
    var newQuestionList = this.data.questions;
    
    var new_id = newQuestionList.length == 0 ? 1 : newQuestionList[newQuestionList.length - 1].id + 1;
    newQuestionList.push({
      quest_type: kTypeText,
      quest_title: '',
      id: new_id
    });
    
    this.setData({
      'questions': newQuestionList
    });
  },

  handleAddChoice: function () {
    var newQuestionList = this.data.questions;
    
    var new_id = newQuestionList.length == 0 ? 1 : newQuestionList[newQuestionList.length - 1].id + 1;
    newQuestionList.push({
      quest_type: kTypeChoice,
      quest_title: '',
      quest_option: [{
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
    
    this.setData({
      'questions': newQuestionList
    });
  },

  handleAddOption: function (e) {
    var index = e.currentTarget.dataset.index;
    var newQuestionList = this.data.questions;
    var cur_options = newQuestionList[index].quest_option.length;
    newQuestionList[index].quest_option.push({
      content: '',
      index: String.fromCharCode(cur_options + 65)
    });
    this.setData({
      'questions': newQuestionList
    });
  },

  handleDeleteOption: function (e) {
    var index = e.currentTarget.dataset.index;
    var newQuestionList = this.data.questions;
    var cur_options = newQuestionList[index].quest_option.length;
    newQuestionList[index].quest_option.splice(cur_options - 1, 1);
    this.setData({
      'questions': newQuestionList
    });
  },

  bindQuestionTitleInput: function (e) {
    var index = e.currentTarget.dataset.index;
    var newQuestionList = this.data.questions;
    newQuestionList[index].quest_title = e.detail.value;
    this.setData({
      'questions': newQuestionList
    });
  },

  bindOptionInput: function (e) {
    var qindex = e.currentTarget.dataset.qindex;
    var idx = e.currentTarget.dataset.idx;
    var newQuestionList = this.data.questions;
    newQuestionList[qindex].quest_option[idx].content = e.detail.value;
    this.setData({
      'questions': newQuestionList
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
    if (task.content.recruit_des.length == 0) {
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

    var questions = this.data.questions;

    if (questions.length == 0) {
      wx.showToast({
        title: '题目数量不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].quest_title.length == 0) {
        wx.showToast({
          title: '题目' + (i + 1) + '不能为空',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (questions[i].quest_type == kTypeChoice) {
        var options = questions[i].quest_option;
        for (let j = 0; j < options.length; j++) {
          if (options[j].content.length == 0) {
            wx.showToast({
              title: '题目' + (i + 1) + '选项' + options[j].index + '不能为空',
              icon: 'none',
              duration: 2000
            });
            return;
          }

          for (let k = 0; k < j; k++) {
            if (options[k].content == options[j].content) {
              wx.showToast({
                title: '错误：题目' + (i + 1) + '选项' + options[k].index + '和选项' + options[j].index + '相同',
                icon: 'none',
                duration: 2000
              });
              return;
            }
          }
        }
      }
    }
    task.content.participant_info = [];
    for (let i = 0; i < questions.length; i++) {
      let question = {
        quest_type: questions[i].quest_type,
        quest_title: questions[i].quest_title
      };
      question.quest_option = [];
      if (questions[i].quest_type == kTypeChoice) {
        var options = question.quest_option;
        for (let j = 0; j < questions[i].quest_option.length; j++) {
          options.push(questions[i].quest_option[j].content);
        }
      }
      task.content.participant_info.push(question);
    }
    console.log("task: ", task);
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