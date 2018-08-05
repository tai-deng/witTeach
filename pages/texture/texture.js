// pages/texture/texture.js
import request from "../../utils/request.js";
import bs from "../../utils/base.js";
Page({
  data: {
    flag:false,
  },
  onLoad: function (options) {
      this.getData(options.id);
      bs.setTitle(bs.cache("title"))
  },
  // 获取数据
  getData(id) {
    var that = this;
    let school_id = bs.cache("school_id");
    request.request({
      site: "Extension_query",
      data: {
        school_id,
      }
    }, function (res) { 
      that.setData({ data: res, id });
      that.reason();
    })
  },
  bindrecharge(e) {
    this.setData({flag:true})
  },
  bindfinish(e) {
    let money = e.detail.value.money;
    if (money > 0) {
      this.payment(money);
    } else {
      wx.showToast({
        title: "金额错误",
        icon:"none",
      })
    }
  },
  bindcancel(e) {
    this.setData({flag:false})
  },
  // 支付
payment(money){
  let that = this;
  let phone = bs.cache("user_phone");
  wx.showNavigationBarLoading()
  request.request({
    site: "SchoolRecharge",
    data: {
      money,
      tel: phone,
    }
  },function(res){
      wx.hideNavigationBarLoading()
      // if(res.status){
        wx.showLoading({
          title: '支付中',
        })
        var timeStamp = res.timeStamp.toString();
        wx.requestPayment({
          'timeStamp':timeStamp,
          'nonceStr':res.nonceStr,
          'package':res.package,
          'signType':res.signType,
          'paySign':res.paySign,
          'success':function(res){
            if (res.errMsg = "requestPayment:ok") {
              wx.showToast({
                title: '购买成功',
                icon: 'success',
                duration: 2000
              });
              that.setData({flag:false})
              that.getData(that.data.id)
            }
          },
          'complete':function(e){
            wx.hideLoading();
          }
        })
      // }
    }
  )
},
  bindextractMoney(e) {
    var id = this.data.id;
    wx.navigateTo({
      url:`../getMoney/getMoney?id=${id}`
    })
  },
  bindextractShift(e) {
    var id = this.data.id;
    wx.navigateTo({
      url:`../manage/record/record?id=${id}`
    })
  },
  bindrecommend(e) {
    // 查看
    let that = this;
    let type = e.currentTarget.dataset.type;
    let tel = bs.cache("user_phone");
    let id = e.currentTarget.dataset.id;
    let money = e.currentTarget.dataset.money;
    console.log(type,e)
    request.request({
      site: "SeeMoney",
      data: {
        id: id,
        money: money,
        tel:tel,
        type:type,
      }
    }, function (res) {
      console.log("···查看->支付···",res);
      that.getData();
    })
  },
  // 投诉原因
  bindcomplain(e) {
    var reason = this.data.reason;
    var index = Number(e.detail.value);
    let id = e.currentTarget.dataset.id;
    let that = this;
    console.log(reason)
    request.request({
      site: "Complaint_post",
      data: {
        id: id,
        reason: reason[index].name,
      }
    }, function (res) { 
      wx.showToast({
        title:"投诉成功！",
        icon:"none",
        success(){
          that.getData();
        }
      })
    })
  },
  // 投诉原因列表
  reason(e) {
    var that = this;
    request.request({
      site: "Complaint",
      data: {}
    }, function (res) { 
      var arr = [];
      res.forEach(element => {
        arr.push(element.name);
      });
      that.setData({ array: arr,reason:res});
    })
  },
  bindcount(e) {
    var direction = e.currentTarget.dataset.index;
    var id = this.data.id;
    if (direction == 2)
    wx.reLaunch({
      url: `./textureSetting/textureSetting?id=${id}`
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