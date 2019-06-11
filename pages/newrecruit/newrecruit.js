// pages/newrecruit/newrecruit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task: {
      content: {
        description: '',
        start_time:'',
        end_time: '',
        participant_info: []
      }
    },
    task_type: '招募',
    start_date: '2019-05-01',
    end_date: '2019-09-30',

  },

  bindStartTime(e) {
    this.setData({
      'task.content.start_time': event.detail.value
    });
  },


  bindDescriptionInput: function (e) {
    this.setData({
      'task.content.description': e.detail.value
    })
  },
  bindLocationInput: function (e) {
    this.setData({
      'this.content.location': e.detail.value
    })
  },
  handleReturn: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_date: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_date: e.detail.value
    })
  },

  handleDeleteQuestion: function (e) {
    var index = e.currentTarget.dataset.index;
    var newQuestionList = this.data.task.content.participant_info;
    console.log(newQuestionList);
    newQuestionList.splice(index, 1);
    console.log(newQuestionList);
    this.setData({
      'task.content.participant_info': newQuestionList
    });
  },

  handleAddText: function () {
    var newQuestionList = this.data.task.content.participant_info;
    console.log(newQuestionList);
    newQuestionList.push({
      type: 'text',
      content: ''
    });
    console.log(newQuestionList);
    this.setData({
      'task.content.participant_info': newQuestionList
    });
  },

  handleAddChoice: function () {
    var newQuestionList = this.data.task.content.participant_info;
    console.log(newQuestionList);
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
      ]
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
    wx.navigateTo({
      url: '/pages/scope/scope'
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