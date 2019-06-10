// pages/newquestionnaire/newquestionnaire.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task : {
      content: {
        questions: [{
          type: 'choice',
          title: '',
          id: 1,
          options: [{
            content: '',
            index: 'A'
          },
          {
            content: '',
            index: 'B'
          }
          ]
        },
        {
          type: 'text',
          title: '',
          id: 2
        }
        ],
      },
    },



    task_type: '问卷',
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  handleReturn: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  handleDeleteQuestion: function (e) {
    var index = e.currentTarget.dataset.index;
    var newQuestionList= this.data.task.content.questions;
    console.log(newQuestionList);
    newQuestionList.splice(index, 1);
    console.log(newQuestionList);
    this.setData({
      'task.content.questions': newQuestionList
    });
  },

  handleAddText: function (){
    var newQuestionList = this.data.task.content.questions;
    console.log(newQuestionList);
    var new_id = newQuestionList.length == 0 ? 1 : newQuestionList[newQuestionList.length-1].id;
    newQuestionList.push({
      type: 'text',
      title: '',
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
    newQuestionList.push({
      type: 'choice',
      title: '',
      options: [{
        content: '',
        index: 'A'
      },
      {
        content: '',
        index: 'B'
      },
      ]
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
    newQuestionList[index].title = e.detail.value;
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
    var cur_options = newQuestionList[index].options.length;
    console.log(cur_options);
    newQuestionList[index].options.push({
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
    newQuestionList[qindex].options[idx].content = e.detail.value;
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
    var cur_options = newQuestionList[index].options.length;
    console.log(cur_options);
    newQuestionList[index].options.splice(cur_options-1, 1);
    console.log(newQuestionList);


    this.setData({
      'task.content.questions': newQuestionList
    });
  },

  handleNextStep: function () {
    var task = this.data.task;
    var questions = task.content.questions;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].title.length == 0) {
        wx.showToast({
          title: '题目' + (i+1) + '不能为空',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var new_task = JSON.parse(options.task);
    console.log("new_task: ", new_task);
    var comm = require('../../utils/common.js');
    var task = this.data.task;
    comm.mergeTaskInfo(task, new_task);
    console.log("task: ", task);
    this.setData({
      task: task
    })
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