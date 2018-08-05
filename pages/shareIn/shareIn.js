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
    this.setData({options:options});
  },
  getInfo() {
    let ops = this.data.options;
    let url = '';
    let arg = '';
    let target = ops.target;
    let tip = bs.cache("tip");
    let latitude = bs.cache("latitude");
    let longitude = bs.cache("longitude");
    // 1.机构 2.文章
    if(ops["user_id"]){
      bs.cache("otherUerId", ops["user_id"]);
      arg = `id=${ops.id}&user_id=${ops.user_id}`;
      this.shareOrigin(ops);
      console.log(latitude,"------",longitude)
    }else{
      arg = `id=${ops.id}`;
    }
    
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
        }
      })
    } catch (error) {
      wx.showToast({title:error})
    }

  },
  // 分享分配
  shareOrigin() {
    let ops = {user_id:34};
    request.request({
      site: "click_share",
      data: {
        user_id: ops.user_id,
      }
    }, function (res) {
      console.log("记录分享点击",ops)
    })
  },
  bindgetuserinfo(e) {
    var that = this;
    var userInfo = e.detail.userInfo;
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    console.log(e)
    wx.showLoading({ title: "加载中..." });
    wx.login({
      success(res){
        wx.request({
          url: "https://hj.wocon.cn/sign_in",
          data: {
            iv: iv,
            encrypted_data: encryptedData,
            cid: "547a339ff29f2d584dga25471ffac9bf1ad",
            js_code:res.code,
          },
          method:"POST",
          header: {
              'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            bs.cache('user_info', userInfo);
            bs.cache('mstr', res.data.data.mstr);
            that.getInfo();

          },fail(res){
          }
        })
      }
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