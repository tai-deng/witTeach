// pages/port3/port3B/port3B.js
import bs from '../../../utils/base.js';
import request from '../../../utils/request.js';
Page({
  data: {
    array: ["01","02","03","04","05","06","07","08","09","10","11","12"],
    total: [
      {pic:"../imgs/a.jpg",name:"张三丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张四丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张五丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张刘丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张刘丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张刘丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张刘丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张刘丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张刘丰",money:"33.8"},
      {pic:"../imgs/a.jpg",name:"张刘丰",money:"33.8"},
    ],
    money: 998,
    sumMoney: 1888,
    month:"本月",
  },
  onLoad: function (options) {
    this.getData(options.id);
    bs.setTitle(bs.cache("title"));
  },
  // 获取数据
  getData(id,day='') {
    var that = this;
    id = id ? id : this.data.id;
    bs.setTitle("省市区代理")
    let tel = bs.cache("user_phone");
    request.request({
      site: "ProvinceProfit",
      data: {
        school_id: id,
        tel: tel,
        day: day,
      }
    }, function (res) {
      that.setData({data:res,id})
    })
  },
  binddrawings(e) {
    // 提款
    var id = bs.cache("pid");
    wx.navigateTo({
      url:`../../getMoney/getMoney?id=${id}`
    })
  },
  bindrecord(e) {
    // 提现记录 record
    var id = bs.cache("pid");
    wx.navigateTo({
      url:`../../manage/record/record?id=${id}`
    })
  },
  bindtotal(e) {
    // 选择月份
    var index = Number(e.detail.value);
    var array = this.data.array;
    this.setData({ month: array[index] })
    this.getData(this.id,array[index])
  },
  bindcount(e) {
    var direction = e.currentTarget.dataset.index;
    var url;
    var id = this.data.id;
    if (direction == 1) {
      url;
    } else if (direction == 2) {
      url = `../port3?id=${id}`;
    }else if (direction == 3) {
      url = `../port3C/port3C?id=${id}`;
    }else if (direction == 4) {
      url = `../port3D/port3D?id=${id}`;
    }
    if (url) {
      wx.reLaunch({
        url: url,
      })  
    }
  },
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