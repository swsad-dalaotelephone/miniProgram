// pages/fulfiltask/fulfiltask.js
var app = getApp()
const http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */

  data: {
    page_title: '问卷',
    type: 'q',
    questions: [{
      quest_type: 'choice',
      quest_title: '你认为中国将在多久之后夺得世界杯冠军？',
      id: 1,
      quest_option: [{
        content: '20年内',
        index: 'A'
      },
      {
        content: '50年内',
        index: 'B'
      },
      {
        content: '100年内',
        index: 'C'
      },   
      {
        content: '200年内',
        index: 'D'
      },     
      ]
    },
    {
      quest_type: 'text',
      quest_title: '说说你对中国足球的看法。',
      id: 2
    },
    {
      quest_type: 'choice',
      quest_title: '你认为***会连任到什么时候？',
      id: 3,
      quest_option: [{
        content: '2022',
        index: 'A'
      },
      {
        content: '2027',
        index: 'B'
      },
      {
        content: '2032',
        index: 'C'
      },
      {
        content: '2037',
        index: 'D'
      },
      {
        content: '2042',
        index: 'E'
      },    
      {
        content: '2047',
        index: 'F'
      }
      ]
    },
    ],
    task_id: '',
    answers: [],
  },
  handleReturn: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  handleOptionChange: function(e) {
    var qindex = e.currentTarget.dataset.qindex;
    var answers = this.data.answers;

    let option_index = 0;
    let options = this.data.questions[qindex].quest_option;
    for (; option_index < options.length; option_index++) {
      if (options[option_index].content == e.detail.value) break;
    }

    answers[qindex] = {
      type: 'm',
      option: [option_index]
    };
    this.setData({
      answers: answers
    })
  },

  bindTextInput: function(e) {
    var qindex = e.currentTarget.dataset.qindex;
    var answers = this.data.answers;
    answers[qindex] = {
      type: 'f',
      text: e.detail.value
    }
    this.setData({
      answers: answers
    })
  },
  bindMailInput: function (e) {
    answers[0] = {
      type: 'f',
      text: e.detail.value
    }
  },
  handleSubmit: function(e) {
    let answers = this.data.answers;
    let questions = this.data.questions;
    console.log(answers);
    for (let i = 0; i < questions.length; i++) {
      if (typeof answers[i] == 'undefined') {
        wx.showToast({
          title: '需填写第'+(i+1)+'题',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }

    http._put('/task/' + this.data.task_id + '/acceptance/answer', 'answer=' + JSON.stringify({answer:answers}),'application/x-www-form-urlencoded').then(res => {
      console.log(res);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.navigateTo({
              url: '/pages/taskcomplete/taskcomplete'
            });
          }, 2000) //延迟时间
        }
      });
    }).catch(e => {
      console.log(e);
      wx.showToast({
        title: '提交失败，请联系程序员小哥哥',
        icon: 'none',
        duration: 2000,
        });
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.task != 'undefined') {
      let task = JSON.parse(options.task);
      let page_title = task.name;
      let questions = task.type == 'q' ? task.content.questions : task.content.participant_info;
      let new_id = 0;
      for (let i = 0; i < questions.length; i++) {
        questions[i].id = ++new_id;
        if (questions[i].quest_type == 'text') continue;
        let options = [];       
        for (let j = 0; j < questions[i].quest_option.length; j++) {
          options.push({
            content: questions[i].quest_option[j],
            index: String.fromCharCode(j + 65)
          })
        }
        questions[i].quest_option = options;
      }

      this.setData({
        type: task.type,
        task_id: task.id,
        page_title: page_title,
        questions: questions
      });
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