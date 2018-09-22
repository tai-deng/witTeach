// pages/texture/textureSetting/textureSetting.js
import request from "../../../utils/request.js";
import bs from "../../../utils/base";
Page({
  data: {
  
  },
  onLoad: function (options) {
    bs.setTitle(bs.cache("title"))
    this.setData({id:options.id})
  },
  getData() { 
    var that = this;
    let phone = bs.cache("user_phone");
    let id = this.data.id;
    request.request({
      site: "Extension",
      data: {
        tel:phone,
      }
    }, function (res) { 
      that.setData({ data: res ,id});
      console.log("学校",id)
    })
  },
  bindcount(e) {
    var direction = e.currentTarget.dataset.index;
    var id = this.data.id;
    if (direction == 1)
    wx.reLaunch({
      url: `../texture?id=${id}`
    })  
  },
  // 获取输入值
  bindinput(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var value = e.detail.value.trim();
    var data = this.data.data;
    let phone = bs.cache("user_phone");
    if (!value) {
      value = 0;
    }
    var id = this.data.id;
    if (index == 1) {
      this.upLoad({ money: value,type: "read_money",tel:phone})
      data.read_money = value;
    }
    if (index == 2) {
      this.upLoad({ money: value,type: "sign_money",tel:phone})
      data.sign_money = value;
    }
    if (index == 3) {
      this.upLoad({ money: value,type: "recommend_money",tel:phone})
      data.recommend_money = value;
    }
    if (index == 4) {
      this.upLoad({ money: value,type: "free_read_money",tel:phone})
      data.free_read_money = value;
    }
    if (index == 5) {
      this.upLoad({ money: value,type: "free_sign_money",tel:phone})
      data.free_sign_money = value;
    }
    if (index == 6) {
      this.upLoad({ money: value,type: "purchase",tel:phone})
      data.purchase = value;
    }
    this.setData({data})
  },
  // 修改当前的值
  bindrevise(e) {
    var focus = e.currentTarget.dataset.index;
    var data = this.data.data;
    /* if (focus == 1) {
      data.read_money = '';
    }
    if (focus == 2) {
      data.sign_money = '';
    }
    if (focus == 3) {
      data.recommend_money = '';
    }
    if (focus == 4) {
      data.free_read_money = '';
    }
    if (focus == 5) {
      data.free_sign_money = '';
    }
    if (focus == 6) {
      data.purchase = '';
    } */
    this.setData({focus})
  },
  // 更新数据
  upLoad(data) {
    request.request({
      site: "Commission",
      data: data
    }, function (res) { 
      console.log(res)
    })
  },
  // 推广开关
  bindchange(e) {
    var checked = e.detail.value;
    var state = 0;
    var id = this.data.id;
    let phone = bs.cache("user_phone");
    if (checked) {
      state = 1
    }
    this.upLoad({ money:state, type: "state", tel: phone });
  },
  // 推广公里数
  bindkm(e) {
    var km = this.data.data.distance;
    var id = this.data.id;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.navigateTo({
          url:`../textureDistance/textureDistance?latitude=${latitude}&longitude=${longitude}&km=${km}&id=${id}`
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
    this.getData();
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