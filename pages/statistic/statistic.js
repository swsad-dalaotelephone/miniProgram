// pages/statistic/statistic.js
const http = require('../../utils/http.js')
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_id: ''
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = []
    console.log(options)
    let task_id = options.task_id
    http._get('/task/' + task_id + '/statistic').then(res => {
      let tempData = JSON.parse(res).statistics
      console.log(tempData)
      tempData.forEach(function(item){
        console.log(item)
        // data.push({name:})
      })

    }).catch(e => {
      console.log(e)
    })
    this.setData({
      task_id: task_id
    })

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      // series: [{
      //   name: '成交量1',
      //   data: 15,
      // }, {
      //   name: '成交量2',
      //   data: 35,
      // }, {
      //   name: '成交量3',
      //   data: 78,
      // }, {
      //   name: '成交量4',
      //   data: 63,
      // }, {
      //   name: '成交量2',
      //   data: 35,
      // }, {
      //   name: '成交量3',
      //   data: 78,
      // }, {
      //   name: '成交量4',
      //   data: 63,
      // }, {
      //   name: '成交量2',
      //   data: 35,
      // }, {
      //   name: '成交量3',
      //   data: 78,
      // }, {
      //   name: '成交量3',
      //   data: 78,
      // }],
      series: data,
      width: windowWidth,
      height: 300,
      dataLabel: true,
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