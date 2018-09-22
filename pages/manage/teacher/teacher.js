// pages/manage/teacher/teacher.js
import request from "../../../utils/request.js";
import bs from "../../../utils/base.js";
Page({
  data: {
    upload:true,
    /* total: [
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张三丰",state:false},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张四丰",state:true},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张五丰",state:true},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:false},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:false},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:true},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:false},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:true},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:false},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:true},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:false},
      {pic:"../../imgs/a.jpg",time:"两天前",phone:"18673417231",name:"张刘丰",state:false},
    ], */
  },
  onLoad: function (options) {
    this.getData(options.id);
    bs.setTitle(bs.cache("title"))
  },
  getData(school_id, page = 1, pagesize = 20) {
    var that = this;
    var upload = this.data.upload;
    if (upload) {
      request.request({
        site: "Invitation",
        data: {
          school_id: school_id,
          page: page,
          pagesize: pagesize
        }
      }, function (res) {
        if (res.length < 20) {
          upload = false;
        }
        wx.stopPullDownRefresh();
        that.setData({ data: res, upload ,page,school_id})
      })
    }
  },
  bindcount(e) {
    var direction = e.currentTarget.dataset.index;
    var id = this.data.school_id;
    if (direction == 1)
    wx.reLaunch({
      url: `../manage?id=${id}`
    })  
  },
  bindcall(e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  switch1Change(e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var data = this.data.data;
    var value = e.detail.value;
    var that = this;
    if (value == false) {
      value = 2
    } else {
      value = 1
    }
    request.request({
      site: "Invitation_edit",
      data: {
        id: id,statr:value
      }
    }, function (res) { 
      data[index].statr = value;
      that.setData({ data });
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
    var upload = this.data.upload;
    var page = this.data.page;
    var school_id = this.data.school_id;
    if (upload) {
      page++;
      this.getData(school_id,page)
    } else {
      wx.stopPullDownRefresh();
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
    var id = this.data.school_id;
    return {
      imageUrl:"../../imgs/a.jpg",
      title: '老师端分享',
      path: `/pages/shareIn/shareIn?id=${id}`
    }
  }
})