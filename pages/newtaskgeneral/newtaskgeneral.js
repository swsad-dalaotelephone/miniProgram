// pages/newtaskgeneral/newtaskgeneral.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {

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

    task_name: '',
    position: 'left',
    current_tag: [], 
    task_types: ['问卷', '信息收集', '招募'],
    type_index: 0,
    newTaskText: '发布任务',
    amount: 1,
    pay: 1
  },

  bindTaskNameInput: function (e) {
    this.setData({
      task_name: e.detail.value
    })
  },

  handleAmountChange({ detail }) {
    this.setData({
      amount: detail.value
    })
  },

  handlePayChange({ detail }) {
    this.setData({
      pay: detail.value
    })
  },

  handleTypeChange: function (e) {
    console.log('picker选择改变，携带值为', e.detail.detail.value)
    this.setData({
      type_index: e.detail.detail.value
    })
  },

  handleTagChange({ detail = {} }) {
    const index = this.data.current_tag.indexOf(detail.value);
    index === -1 ? this.data.current_tag.push(detail.value) : this.data.current_tag.splice(index, 1);
    this.setData({
      current_tag: this.data.current_tag
    });
    console.log('grade选择改变为', this.data.current_tag)
  },



  handleReturn: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
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