//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    background: ['../../images/home1.jpg', '../../images/home2.png', '../../images/home3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },

  //事件处理函数
  onLoad: function() {

  }
})