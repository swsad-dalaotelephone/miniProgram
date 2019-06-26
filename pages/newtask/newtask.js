// pages/newtask/newtask.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    questionList: [{
      type: 'choice',
      content: '',
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
      content: '',
    }
    ], 
    array: ['问卷', '信息收集', '招募', '物流'],
    index: 0,
    newTaskText: '新建任务',
    taskname: '',
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  handleReturn: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  handleDeleteQuestion: function (e) {
    var index = e.currentTarget.dataset.index;
    var newQuestionList = this.data.questionList;
    console.log(newQuestionList);
    newQuestionList.splice(index, 1);
    console.log(newQuestionList);
    this.setData({
      questionList: newQuestionList
    });
  },

  handleAddText: function (){
    var newQuestionList = this.data.questionList;
    console.log(newQuestionList);
    newQuestionList.push({
      type: 'text',
      content: ''
    });
    console.log(newQuestionList);
    this.setData({
      questionList: newQuestionList
    });    
  },

  handleAddChoice: function () {
    var newQuestionList = this.data.questionList;
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
      questionList: newQuestionList
    });
  },

  handleAddOption: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var newQuestionList = this.data.questionList;
    console.log(newQuestionList);
    var cur_options = newQuestionList[index].options.length;
    console.log(cur_options);
    newQuestionList[index].options.push({
        content: '',
        index: String.fromCharCode(cur_options + 65)
      });
    console.log(newQuestionList);

    this.setData({
      questionList: newQuestionList
    });
  },

  handleDeleteOption: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var newQuestionList = this.data.questionList;
    console.log(newQuestionList);
    var cur_options = newQuestionList[index].options.length;
    console.log(cur_options);
    newQuestionList[index].options.splice(cur_options-1, 1);
    console.log(newQuestionList);


    this.setData({
      questionList: newQuestionList
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