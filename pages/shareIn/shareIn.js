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
    let arg = '';
    let target = ops.target;
    // 1.机构 2.文章
    if(ops["user_id"]){
      bs.cache("otherUerId", ops["user_id"]);
      arg = `id=${ops.id}&user_id=${ops.user_id}`;
      this.shareOrigin(ops);
    }else{
      arg = `id=${ops.id}`;
    }
    
    this.getUserShow(target,arg,ops);
  },
  getUserShow(target,arg,ops){
    let url='';
    request.request({
      site: "usertype",
      data: {}
    }, function (res) {
      bs.cache("tip",res.type);
      if (target == "institution") {
        if (res.type) {
          url = "../terrace/terrace?" + arg;
        } else {
          url = '../index/index?' + arg;
        }
      }

      if (target == "article") {
        if(res.type){
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
    })
  },

  // 分享分配
  shareOrigin(ops) {
    request.request({
      site: "click_share",
      data: {
        user_id: ops.user_id,
        article_id:ops.id,
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
    let user_id = this.data.options['user_id']
    console.log(e)
    wx.showLoading({ title: "加载中..." });
    wx.login({
      success(res){
        wx.request({
          url: "https://hjw.wocon.cn/sign_in",
          data: {
            iv: iv,
            encrypted_data: encryptedData,
            cid: "547a339ff29f2d584dga25471ffac9bf1ad",
            js_code:res.code,
            user_id,
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
          },complete(res){
            wx.hideLoading();
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
  // onShareAppMessage: function () {
  
  // }
})