// pages/fulfiltask/fulfiltask.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    page_title: '问卷',
    type: 'q',
    questions: [{
      type: 'choice',
      title: '你认为中国将在多久之后夺得世界杯冠军？',
      id: 1,
      options: [{
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
      type: 'text',
      title: '说说你对中国足球的看法。',
      id: 2
    },
    {
      type: 'choice',
      title: '你认为小熊维尼会连任到什么时候？',
      id: 3,
      options: [{
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
    mail: "",
    answers: [],
  },

  handleOptionChange: function(e) {
    var qindex = e.currentTarget.dataset.qindex;
    var answers = this.data.answers;
    answers[qindex] = e.detail.value;
    this.setData({
      answers: answers
    })
  },

  bindTextInput: function(e) {
    var qindex = e.currentTarget.dataset.qindex;
    var answers = this.data.answers;
    answers[qindex] = e.detail.value;
    this.setData({
      answers: answers
    })
  },
  bindMailInput: function (e) {
    this.setData({
      mail: e.detail.value
    })
  },
  handleSubmit: function(e) {
    console.log(this.data.answers);
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