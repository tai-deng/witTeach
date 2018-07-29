// pages/manage/manage.js
import bs from "../../utils/base.js";
import request from "../../utils/request.js";
Page({
  data: {
    array: ["01","02","03","04","05","06","07","08","09","10","11","12"],
    /* total: [
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
    sumMoney: 1888, */
    month:"本月",
    upLoad:true,
  },
  onLoad: function (options) {
    bs.systemInfo(575, this)
    this.getData(options.id);
    bs.setTitle(bs.cache("title"))
  },
  getData(id,page=1,pagesize=20,day='') {
    var that = this;
    var upLoad = this.data.upLoad;
    let school_id = bs.cache("school_id");
    if (upLoad) {
      request.request(
        {
          site: "Ranking",
          data: {
            school_id,
            page: page,
            pagesize: pagesize,
            day:day
          }
        },
        function (res) {
          console.log(res)
          if (res.earnings.length > 20) {
            upLoad: false;
          }
          that.setData({
            id: school_id,
            data: res,
            upLoad,page
          })
        }
      )
    }
  },
  binddrawings(e) {
    // 提款
    var id = this.data.data.pid;
    wx.navigateTo({
      url:`../getMoney/getMoney?id=${id}`
    })
  },
  bindrecord(e) {
    // 提现记录 record
    var id = this.data.data.pid;
    wx.navigateTo({
      url:`./record/record?id=${id}`
    })
  },
  bindtotal(e) {
    // 选择月份
    var index = Number(e.detail.value);
    var array = this.data.array;
    var id = this.data.id;
    this.setData({month:array[index]})
    this.getData(id,1,20,array[index])
  },
  bindcount(e) {
    var direction = e.currentTarget.dataset.index;
    var id = this.data.id;
    if (direction == 2)
    wx.reLaunch({
      url: `./teacher/teacher?id=${id}`
    })  
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
    var upLoad = this.data.upLoad;
    var page = this.data.page;
    var id = this.data.id;
    if (upLoad) {
      page++;
      this.getData(id, page);
    }
    
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
    var that = this;
    /* request.request({
      site: "InvitingPartners",
        data: {
          tel: tel
        }
      },function (res) {

    }) */
    return {
      title: '期待您的加入',
      path: `/pages/login/login`
    }
  }
})