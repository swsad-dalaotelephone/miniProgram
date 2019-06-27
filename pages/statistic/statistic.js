// pages/statistic/statistic.js
const http = require('../../utils/http.js')
var wxCharts = require('../../utils/wxcharts.js');
var pieChart = null;
var kTypeChoice = 'm';
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
    // plot 
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    console.log(options)
    if (typeof options.task != 'undefined') {
      let task = JSON.parse(options.task);
      if (task.type != 'q') return;
      let task_id = task.id;
      this.setData({
        task_id: task_id
      })
      http._get('/task/' + task_id + '/statistic').then(res => {
        let tempData = JSON.parse(res).statistics
        
        let question_count = 0;
        for (let i = 0; i < task.content.questions.length; i++) {
          if (task.content.questions[i].quest_type != kTypeChoice) continue;
          tempData[question_count].title = task.content.questions[i].quest_title;
          tempData[question_count].option_name = task.content.questions[i].quest_option;
          ++question_count;
        }
        console.log('tempData:', tempData);

        tempData.forEach(function(item){
          console.log(item)
          /* TODO: show item.title */

          let data = []
          for(let i=0;i < item.option_name.length; ++i){
            data.push({ name: item.option_name[i], data: item.option_count[i]})
          }
          console.log(data)
          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: data,
            width: windowWidth,
            height: 300,
            dataLabel: true,
          })
        })

      }).catch(e => {
        console.log(e)
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