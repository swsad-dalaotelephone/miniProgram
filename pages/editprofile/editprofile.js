// pages/editprofile/editprofile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    date: '2000-01-01',
    gradeIndex: 0,
    grades: ['大一', '大二', '大三', '大四'],
    campusIndex: 0,
    campus: [
      '广州校区南校园',
      '广州校区东校园',
      '广州校区北校园',
      '珠海校区',
      '深圳校区']
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

  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindGradeChange: function (e) {
    this.setData({
      gradeIndex: e.detail.value
    })
  },

  bindCampusChange: function (e) {
    this.setData({
      campusIndex: e.detail.value
    })
  },
})