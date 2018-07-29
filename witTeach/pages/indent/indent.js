// pages/indent/indent.js
import bs from "../../utils/base.js";
import request from "../../utils/request.js";
Page({
  data: {
    data:{
      cls:[
        {notSee:"10",title:"好习1",school:"岳麓区校区",time:"10/24/20",cost:"￥100"},{notSee:"10",title:"好",school:"岳麓区校区",time:"10/24/20",cost:"￥100"},{notSee:"10",title:"好好习",school:"岳麓区校区",time:"10/24/20",cost:"￥100"},
      ],read:[
        {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
        {title:"文章标题",name:"kkkb",titme:"10/24 2017",state:"1元"},
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bs.setTitle("我的订单");
    this.getData();
  },
  bindnotSee(e) {
    // 未查看
    let id = e.currentTarget.dataset.id;
    let num = e.currentTarget.dataset.num;
    if(num<0){
      wx.navigateTo({
        url:`./notSee/notSee?id=${id}`
      })
    }
  },
  bindwithdraw(e){
    // this.setData({flag:true})
    let money = this.data.data.money;
      wx.navigateTo({
        url:'../getMoney/getMoney'
      })
    // wx.showModal({
    //   title: '对不起提现失败！',
    //   content: '应为红包金额有限，请联系客服咨询详情。',
    //   showCancel:false,
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     }
    //   }
    // })
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
  getData() {
    let that = this;
    request.request({
      site: "MyOrder",
      data: {}
    }, function (res) {
      that.setData({ data: res })
      console.log(res)
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