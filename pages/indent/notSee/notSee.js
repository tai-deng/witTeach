import { request } from "../../../utils/request.js";

// pages/indent/notSee/notSee.js
Page({
  data: {
    data: {
      edu:[
        {pic:"../../imgs/a.jpg",courseName:"语文",state:"课程简介：说的分手的方式发生",cost:"998",price:"288"},
        {pic:"../../imgs/a.jpg",courseName:"语文",state:"课程简介：说的分手的方式发生说的分手的方式发生说的分手的方式发生说的分手的方式发生",cost:"998",price:"288"},],
    }
  },
  onLoad: function (options) {
    this.getData(options.id)
  },
  getData(id) {
    let that = this;
    request({
      site: "StudentArticle",
      data: {
        id
      }
    }, function (res) {
      that.setData({ data: res })
      console.log(res)
    })
  },
  binddetails(e) {
    let id = e.currentTarget.dataset.id;
    // wx.navigateTo({
    //   url:`active/active?id=${id}`
    // })
    wx.navigateTo({
      url:`../../article/article?id=${id}`
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})