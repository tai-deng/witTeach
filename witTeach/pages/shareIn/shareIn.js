// pages/shareIn/shareIn.js
import bs from "../../utils/base.js";
import request from "../../utils/request.js";
Page({
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: "加载中..." });
    this.getInfo(options);
  },
  getInfo(ops) {
    let url = '';
    // 1.机构 2.文章
    if(ops["user_id"]){
      bs.cache("otherUerId", ops["user_id"]);
      this.shareOrigin(ops);
    }
    let target = ops.target;
    let arg = `id=${ops.id}&user_id=${ops.user_id}`;
    let tip = bs.cache("tip");

    if (target == "institution") {
      if (tip) {
        url = "../terrace/terrace?" + arg;
      } else {
        url = '../index/index?' + arg;
      }
    }

    if (target == "article") {
      if(tip){
      }
      url = "../article/article?" + arg;
    }
console.log(ops)
    console.log("url",url)

    try {
      wx.redirectTo({
        url, success() {
        wx.hideLoading();
        }
      })
    } catch (error) {
      wx.showToast({title:error})
    }

  },
  // 分享分配
  shareOrigin(ops) {
    request.request({
      site: "click_share",
      data: {
        user_id: ops.user_id,
      }
    }, function (res) {
      console.log("记录分享点击",res)
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
  onShareAppMessage: function () {
  
  }
})