// pages/port4/port4.js
import bs from "../../utils/base.js"
import request from "../../utils/request.js"
Page({
  data: {
    array: ["01","02","03","04","05","06","07","08","09","10","11","12"],
    money: 998,
    sumMoney: 1888,
    month:"本月",
    data: {
    read:[
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元",complaint:"太漂亮"},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
    ],recommend:[
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:""},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
    ],order:[
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:""},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:""},
    ],clinch:[
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:""},
      {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:""},
    ]
    }
  },
  binddrawings(e) {
    // 提款
    var id = bs.cache("pid");
    wx.navigateTo({
      url:`../getMoney/getMoney?id=${id}`
    })
  },
  bindrecord(e) {
    // 提现记录 record
    var id = bs.cache("pid");
    wx.navigateTo({
      url:`../manage/record/record?id=${id}`
    })
  },
  bindtotal(e) {
    // 选择月份
    var index = Number(e.detail.value);
    var array = this.data.array;
    var month = array[index];
    this.setData({ month });
    this.getData(this.id, month)
  },
  bindaward(e){
    var index = e.currentTarget.dataset.index;
    var sel = this.data.sel;
    if(sel == index){
      this.setData({sel:0})
      return false;
    }
    this.setData({
      sel:index
    })
  },
  bindtab(e) {
    var index = e.currentTarget.dataset.index;
    let id = this.data.id;
    var url = "";
    if (index == 1) {
      return false;
    }
    if (index == 2) {
      url = `./port5B/port5B?id=${id}`
    }
    if (index == 3) {
      url = `./port5C/port5C?id=${id}`
    }
    wx.reLaunch({
      url: url,
    })
  },
  getData(id,day = "") {
    var that = this;
    var tel = bs.cache("user_phone");
    let school_id = bs.cache("school_id");
    request.request({
      site: "SalesmanIncome",
      data: {
        school_id,
        tel: tel,
        day: day,
      }
    }, function (res) {
      that.setData({data:res,id:school_id})
    })
  },
  onLoad: function (options) {
    this.getData(options.id);
    bs.setTitle(bs.cache("title"));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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