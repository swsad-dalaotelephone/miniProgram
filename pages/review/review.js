// pages/review/review.js
const http = require('../../utils/http.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    task: {}
  },
  handleReturn: function () {
    wx.navigateBack({

    })
  },
  handleTap1: function () {
    let task = this.data.task;
    console.log('task: ', task);
    wx.navigateTo({
      url: '/pages/fulfiltask/fulfiltask?task=' + JSON.stringify(task)
    })
  },
  handleTap2: function () {
    http._delete('/task/' + this.data.task.id + '/acceptance').then(res => {
      console.log(res);
      wx.showToast({
        title: '放弃任务成功',
        icon: 'success',
        duration: 1500,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.navigateBack({

            })
          }, 1000) //延迟时间
        }
      });
    }).catch(e => {
      console.log(e);
      wx.showToast({
        title: '请求失败，请联系程序员小哥哥',
        icon: 'none',
        duration: 2000,
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let item = {}
    http._get('/task/' + id).then(res => {
      // console.log(JSON.parse(res.acceptance))
      item = JSON.parse(res.task)
      let acceptance = JSON.parse(res.acceptance)
      item.status = acceptance.status
      item.feedback = acceptance.feedback
      console.log(item)

      var detailList = []
      switch (item.type) {
        case 'r':
          detailList = [{
            title: '活动描述',
            detail: item.content.recruit_des
          }, {
            title: '活动时间',
            detail: item.content.start_time + item.content.end_time
          }, {
            title: '活动地点',
            detail: item.content.location
          }, {
            title: '活动报酬',
            detail: item.required_count
          }]
          break;
        case 'q':
          detailList = [{
            title: '问卷描述',
            detail: item.content.quest_des
          }, {
            title: '问卷报酬',
            detail: item.reward
          }, {
            title: '问卷预计份数',
            detail: item.required_count
          }]
          break;
        case 'd':
          detailList = [{
            title: '信息收集描述',
            detail: item.content.data_des
          }, {
            title: '报酬',
            detail: item.reward
          }, {
            title: '需要份数',
            detail: item.required_count
          }]
          break;
        default:
          break;
      }
      this.setData({
        task: item,
        detailList: detailList
      })
    }).catch(e => {
      console.log(e)
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