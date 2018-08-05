// pages/port3/port3C/port3C.js
import bs from "../../../utils/base.js"
import request from "../../../utils/request.js"
Page({
  data: {
    pic:"../../imgs/a.jpg",
    total: [
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
    ],
  },
  onLoad: function (options) {
    this.getData(options.id);
    bs.setTitle(bs.cache("title"));
  },
  // 获取数据
  getData(id) {
    var that = this;
    id = id ? id : this.data.id;
    bs.setTitle("省市区代理")
    let tel = bs.cache("user_phone");
    request.request({
      site: "Cooperation",
      data: {
        tel: tel,
      }
    }, function (res) {
      res.forEach(element => {
        if(element.statr == 1){
          element.statr = true;
        } else if(element.statr == 2) {
          element.statr = false;
        }
      });
      that.setData({data:res,id})
    })
  },
  bindcount(e) {
    var direction = e.currentTarget.dataset.index;
    var url;
    var id = this.data.id;
    if (direction == 1) {
      url=`../port3B/port3B?id=${id}`;
    } else if (direction == 2) {
      url = `../port3?id=${id}`;
    }else if (direction == 3) {
      url;
    }else if (direction == 4) {
      url = `../port3D/port3D?id=${id}`;
    }
    if (url) {
      wx.reLaunch({
        url: url,
      })  
    }
  },
  switch1Change(e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var data = this.data.data;
    var value = e.detail.value;
    let that = this;
    let statr = '';
    if (value) {
      statr = 1;
    } else {
      statr = 2;
    }
    request.request({
      site: "Cooperation_edit",
      data: {
        id,statr
      }
    }, function (res) {
      // data[index].state = statr;
      // that.setData({data})
    })
  },
  bindcall(e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
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