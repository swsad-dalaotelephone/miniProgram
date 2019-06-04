// pages/scope/scope.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    task: {

    },
    grades: [{
      id: 1,
      name: '大一',
    }, {
      id: 2,
      name: '大二'
    }, {
      id: 3,
      name: '大三'
    }, {
      id: 4,
      name: '大四'
    }, {
      id: 5,
      name: '研究生'
    }, {
      id: 6,
      name: '博士生'
    }
    ],

    majors: [{
      id: 1,
      name: '文科',
    }, {
      id: 2,
      name: '理科'
    }, {
      id: 3,
      name: '工科'
    }
    ],
    
    
    current_grade: [],
    current_major: [],
    position: 'left',



    genders: ['不限', '男', '女'],
    gender_index: 0,
    grade_restricts: ['不限', '限制'],
    grade_restrict_index: 0,
    major_restricts: ['不限', '限制'],
    major_restrict_index: 0,
    newTaskText: '发布任务',
  },

  handleGenderChange: function (e) {
    console.log('picker选择改变，携带值为', e.detail.detail.value)
    this.setData({
      gender_index: e.detail.detail.value
    })
  },

  handleMajorRestrictChange: function (e) {
    console.log('picker选择改变，携带值为', e.detail.detail.value)
    this.setData({
      major_restrict_index: e.detail.detail.value
    })
  },

  handleGradeRestrictChange: function (e) {
    console.log('picker选择改变，携带值为', e.detail.detail.value)
    this.setData({
      grade_restrict_index: e.detail.detail.value
    })
  },

  handleGradeChange({ detail = {} }) {
    const index = this.data.current_grade.indexOf(detail.value);
    index === -1 ? this.data.current_grade.push(detail.value) : this.data.current_grade.splice(index, 1);
    this.setData({
      current_grade: this.data.current_grade
    });
    console.log('grade选择改变为', this.data.current_grade)
  },

  handleMajorChange({ detail = {} }) {
    const index = this.data.current_major.indexOf(detail.value);
    index === -1 ? this.data.current_major.push(detail.value) : this.data.current_major.splice(index, 1);
    this.setData({
      current_major: this.data.current_major
    });
    console.log('major选择改变为', this.data.current_major)
  },

  handleClick() {
    this.setData({
      position: this.data.position.indexOf('left') !== -1 ? 'right' : 'left',
    });
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