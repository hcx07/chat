//index.js
//获取应用实例
const app = getApp()
var get_time;
var get_article;
var top;
var content;
Page({
  data: {
    top: top,
    get_time: get_time,
    listData: get_article,
    // listData: [
    //   { "code": "标题", "text": "简介简介简介简介简介简介简介简介简介", "type": "../../public/img/10.jpg" },
    //   { "code": "标题", "text": "简介简介简介简介简介简介简介简介简介", "type": "../../public/img/10.jpg" },
    //   { "code": "标题", "text": "简介简介简介简介简介简介简介简介简介", "type": "../../public/img/10.jpg" },
    //   { "code": "标题", "text": "简介简介简介简介简介简介简介简介简介", "type": "../../public/img/10.jpg" },
    //   { "code": "标题", "text": "简介简介简介简介简介简介简介简介简介", "type": "../../public/img/10.jpg" },
    //   { "code": "标题", "text": "简介简介简介简介简介简介简介简介简介", "type": "../../public/img/10.jpg" },
    //   { "code": "标题", "text": "简介简介简介简介简介简介简介简介简介", "type": "../../public/img/10.jpg" }
    // ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    today: [{
      name: 'div',
      children: [{
        type: 'text',
        text: '今日推荐'
      }]
    }],
    body: {},
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 获取文章详情
  info: function (e) {
    var articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'info?articleId=' + articleId
    })
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    //获取服务器时间
    wx.request({
      url: 'https://chat.muniao.org/index/get-time',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var time = res.data.data;
        that.setData({
          get_time: time.time
        })
      }
    });
    wx.request({
      url: 'https://chat.muniao.org/index/get-top',
      data: {
        date: 'time'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          top: res.data.data
        })
      }
    });
    wx.request({
      url: 'https://chat.muniao.org/index/get-article',
      data: {
        date: 'time'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var article = res.data.data;
        that.setData({
          get_article: article
        })
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  click: function () {
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.setData({ msg: 'hello word' })
  },
  article_info: function (event) {
    var article_id = event.currentTarget.dataset.id;
  }
})
