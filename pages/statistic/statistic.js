// pages/statistic/statistic.js
import * as echarts from '../../ec-canvas/echarts';
const http = require('../../utils/http.js')
var list = []
var list1 = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_id: '',
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let task_id = options.task_id
    http._get('/task/'+task_id+'/statistic').then(res => {
      console.log(res)
    }).catch(e=>{
      console.log(e)
    })
    this.setData({
      task_id: task_id
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
// 初始化图表
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['客户']
    },
    grid: {
      left: '1%',
      right: '30rpx',
      bottom: '1%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: list,
      name: '月份',
      nameGap: 2,
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: '数量'
    },
    series: [
      {
        name: '客户',
        type: 'line',
        stack: '总量',
        data: list1
      }
    ]
  };

  chart.setOption(option);
  return chart;
}