// pages/manage/record/record.js
import request from "../../../utils/request.js";
import bs from "../../../utils/base.js";
Page({
  data: {
   /*  data: [
      {money:100,date:"2018-05-13",time:"00:00"},
      {money:100,date:"2018-05-13",time:"00:00"},
      {money:100,date:"2018-05-13",time:"00:00"},
      {money:100,date:"2018-05-13",time:"00:00"},
      {money:100,date:"2018-05-13",time:"00:00"},
      {money:100,date:"2018-05-13",time:"00:00"},
    ], */
    upLoad:true,
  },
  onLoad: function (options) {
    this.getData(options.id);
    bs.setTitle(bs.cache("title"))
  },
  getData(id,page=1,pagesize=20) {
    var that = this;
    var upLoad = this.data.upLoad;
    if (upLoad) {
      bs.setTitle("提现记录");
      request.request(
        {
          site: "Withdrawal_list",
          data: {
            pid: id,
            page: page,
            pagesize: pagesize,
          }
        }, function (res) {
          if (res.withdrawal.length > 20) {
            upLoad = false;
          }
          that.setData({
            data: res, id, page,upLoad
          })
          wx.stopPullDownRefresh();
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
    var upLoad = this.data.upLoad;
    var page = this.data.page;
    var id = this.data.id;
    if (upLoad) {
      page++;
      this.getData(id,page)
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
  
  }
})