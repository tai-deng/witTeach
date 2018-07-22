// pages/port4/port4C/port4C.js
import bs from "../../../utils/base.js";
import request from "../../../utils/request.js";
Page({
  data: {
    classSum: 10,
    studySum:80,
    content: [
      {class:"计算机95班",studySum:20,study:[
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},

      ]},
      {class:"计算机95班",studySum:20,study:[
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},

      ]},
      {class:"计算机95班",studySum:20,study:[
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},
        {name:"张三",phone:18673417231,patriarch:"老李",remaining:5},

      ]},
    ]
  },
  onLoad: function (options) {
    this.getData(options.id);
    bs.setTitle(bs.cache("title"));
  },
  bindtab(e) {
    var index = e.currentTarget.dataset.index;
    let id = this.data.id;
    var url = "";
    if (index == 3) {
      return false;
    }
    if (index == 1) {
      url = `../port5?id=${id}`
    }
    if (index == 2) {
      url = `../port5B/port5B?id=${id}`
    }
    wx.reLaunch({
      url: url,
    })
  },
  bindaward(e) {
    var sel = e.currentTarget.dataset.index;
    this.setData({sel})
  },
  // 获取数据
  getData(id) {
    var that = this;
    id = id ? id : this.data.id;
    let tel = bs.cache("user_phone");
    request.request({
      site: "Student",
      data: {
        school_id: id,tel
      }
    }, function (res) {
      that.setData({data:res,id})
    })
  },
  bindCall(e) {
    // let phone = e.currentTarget.dataset.call;
    bs.call(e);
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