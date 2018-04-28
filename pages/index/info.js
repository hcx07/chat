// pages/index/info.js
var info;
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:info
    // { "title": "标题", "content": "简介简介简介简介简介简介简介简介简介", "img": "../../public/img/10.jpg", "other": "2018-04-21 12:00" }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://chat.muniao.org/index/get-info?article_id=' + options.articleId,
      data: {
        date: 'time'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        WxParse.wxParse('content', 'html', res.data.data.content, that, 5);
        that.setData({
          info: res.data.data
        })
      }
    });
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