// pages/advisory/advisory.js
import bs from "../../utils/base.js";
import request from "../../utils/request.js";
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  binddetails(e) {
    let id = e.currentTarget.dataset.id;
    let tip = bs.cache("tip");
    let url = '';
    if (tip) {
      url = "../terrace/terrace?" + id;
    } else {
      url = '../index/index?' + id;
    }
    wx.navigateTo({
      url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.noSee) {
      this.setData({noSee:true})
    }
    this.getData(options);
  },
  getData(options) {
    var that = this;
    bs.setTitle("资讯")
    request.request({
      site: "article_cat",
      data: {
        id: options.id,
      }
    }, function (res) {
      var article = res.content;
      WxParse.wxParse('article', 'html', article, that, 5);
      that.setData({ data: res})
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