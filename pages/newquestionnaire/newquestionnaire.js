// pages/newquestionnaire/newquestionnaire.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task : {
      type: 'q',
      content: {
        quest_des: '',
        questions: [{
          quest_type: 'choice',
          quest_title: '',
          quest_option: [{
            content: '',
            index: 'A'
          },
          {
            content: '',
            index: 'B'
          }
          ],
          id: 1
        },
        {
          quest_type: 'text',
          quest_title: '',
          id: 2
        }
        ],
      },
    },

    task_type: '问卷',
  },

  bindDescriptionInput: function(e) {
    this.setData({
      'task.content.quest_des': e.detail.value
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
          var newQuestionList = that.data.task.content.questions;
          console.log(newQuestionList);
          newQuestionList.splice(index, 1);
          console.log(newQuestionList);
          that.setData({
            'task.content.questions': newQuestionList
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },

  handleAddText: function (){
    var newQuestionList = this.data.task.content.questions;
    console.log(newQuestionList);
    var new_id = newQuestionList.length == 0 ? 1 : newQuestionList[newQuestionList.length-1].id + 1;
    newQuestionList.push({
      quest_type: 'text',
      quest_title: '',
      id: new_id
    });
    console.log(newQuestionList);
    this.setData({
      'task.content.questions': newQuestionList
    });    
  },

  handleAddChoice: function () {
    var newQuestionList = this.data.task.content.questions
    console.log(newQuestionList);
    var new_id = newQuestionList.length == 0 ? 1 : newQuestionList[newQuestionList.length - 1].id + 1;
    newQuestionList.push({
      quest_type: 'choice',
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
    console.log(newQuestionList);
    this.setData({
      'task.content.questions': newQuestionList
    });
  },

  bindQuestionTitleInput: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var newQuestionList = this.data.task.content.questions;
    console.log(newQuestionList);
    newQuestionList[index].quest_title = e.detail.value;
    console.log(newQuestionList);

    this.setData({
      'task.content.questions': newQuestionList
    });    
  },

  handleAddOption: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var newQuestionList = this.data.task.content.questions;
    console.log(newQuestionList);
    var cur_options = newQuestionList[index].quest_option.length;
    console.log(cur_options);
    newQuestionList[index].quest_option.push({
        content: '',
        index: String.fromCharCode(cur_options + 65)
      });
    console.log(newQuestionList);

    this.setData({
      'task.content.questions': newQuestionList
    });
  },

  bindOptionInput: function (e) {
    var qindex = e.currentTarget.dataset.qindex;
    var idx = e.currentTarget.dataset.idx;
    console.log(qindex);
    console.log(idx);
    var newQuestionList = this.data.task.content.questions;
    console.log(newQuestionList);
    newQuestionList[qindex].quest_option[idx].content = e.detail.value;
    console.log(newQuestionList);

    this.setData({
      'task.content.questions': newQuestionList
    });
  },

  handleDeleteOption: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var newQuestionList = this.data.task.content.questions;
    console.log(newQuestionList);
    var cur_options = newQuestionList[index].quest_option.length;
    console.log(cur_options);
    newQuestionList[index].quest_option.splice(cur_options-1, 1);
    console.log(newQuestionList);

    this.setData({
      'task.content.questions': newQuestionList
    });
  },

  handleNextStep: function () {
    var task = this.data.task;

    if (task.content.quest_des.length == 0) {
      wx.showToast({
        title: '问卷描述不能为空',
        icon: 'none',
        duration: 2000
      });
      return;          
    }

    var questions = task.content.questions;

    if (questions.length == 0) {
      wx.showToast({
        title: '题目数量不能为空',
        icon: 'none',
        duration: 2000
      });
      return;       
    }

    for (var i = 0; i < questions.length; i++) {
      if (questions[i].quest_title.length == 0) {
        wx.showToast({
          title: '题目' + (i+1) + '不能为空',
          icon: 'none',
          duration: 2000
        });
        return;      
      }
      if (questions[i].quest_type == 'choice') {
        var options = questions[i].quest_option;
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
    for (var i = 0; i < questions.length; i++) {
      delete questions[i].id;
      if (questions[i].quest_type == 'choice') {
        var options = [];

        for (var j = 0; j < questions[i].quest_option.length; j++) {
          options.push(questions[i].quest_option[j].content);
        }
        questions[i].quest_option = options;
      }
      else {
        questions[i].quest_option = [];
      }

    }
    console.log("task: ", task);
    wx.navigateTo({
      url: '/pages/scope/scope?task=' + JSON.stringify(task),
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