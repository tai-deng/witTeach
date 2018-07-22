// pages/texture/textureDistance/textureDistance.js
import request from "../../../utils/request.js";
import bs from "../../../utils/base.js";
Page({
  data: {
  },
  onLoad: function (options) {
    this.getMid(options);
    this.addKm();
    bs.setTitle(bs.cache("title"));
  },
  moveToLocation(e){
    // this.mapCtx.moveToLocation();
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function(res){
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          show:true,
          /* markers:[{
            id: 0,
            iconPath: "../imgs/map-loc.png",
            latitude: res.latitude,
            longitude: res.longitude,
            width: 32,
            height: 32
          }], */
          circles:[{
            latitude:res.latitude,
            longitude:res.longitude,
            fillColor:"#7cb5ec88",
            radius:500,
          }]
        })
      }
    })
  },
  lessenKm(e){
    var km =  this.data.km;
    if(km>1){
      km--
    }else if(km==1){
      km = 1;
    }
    var conversion = km * 500;
    var circles = this.data.circles;
    circles[0].radius = conversion;
    this.setData({circles,km})
  },
  addKm(e){
    var km =  this.data.km;
    if(km<15){
      km++
    }else{
      km = 15;
    }
    var conversion = km * 500;
    var circles = this.data.circles;
    circles[0].radius = conversion;
    this.setData({circles,km})
  },
  getMid(options) {
    var that = this;
    var latitude = options.latitude;
    var longitude = options.longitude;
    var circles = [{
      latitude:latitude,
      longitude:longitude,
      fillColor:"#7cb5ec88",
      radius:500,
    }];
    that.setData({latitude,longitude,circles,km:options.km,id:options.id})
    wx.getSystemInfo({
      success(res){
        var top = res.screenHeight / 2-46;
        var left = res.screenWidth / 2-7;
        that.setData({top,left})
      }
    })
  },
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
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
    var id = this.data.id;
    var km = this.data.km;
    let phone = bs.cache("user_phone");
    request.request({
      site: "Commission",
      data: { money: km, type: "distance", tel: phone }
    }, function (res) { 
    })
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