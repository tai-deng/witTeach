// pages/advisory/advisory.js
/* import bs from "../../../../utils/base.js";
import request from "../../../../utils/request.js";
var WxParse = require('../../../../wxParse/wxParse.js');
Page({

  data: {

  },
  binddetails(e) {
    wx.navigateBack({
      delta: 2
    })
  },
  onLoad: function (options) {
    this.getData(options);
  },
  getData(options) {
    var that = this;
    bs.setTitle("资讯")
    request.request({
      site: "StudentArticleCat",
      data: {
        id: options.id,
      }
    }, function (res) {
      var article = res.content;
      WxParse.wxParse('article', 'html', article, that, 5);
      that.setData({ data: res })
    })
  }, */

  import bs from "../../../../utils/base.js";
  import request from "../../../../utils/request.js";
  var WxParse = require('../../../../wxParse/wxParse.js');
  Page({
    data: {
      institution:[
        {pic:"../imgs/a.jpg",title:"长郡中学",loc:"课程简介：说的分手的方式发生",call:"998",},{pic:"../imgs/a.jpg",title:"长郡中学",loc:"课程简介：说的分手的方式发生",call:"998",},
      ],
    },
    bindmore(e){
      // 了解更多
      let id = e.currentTarget.dataset.id;
      let user_id = bs.cache("otherUerId");
      // 家长端进家长端机构详情 -->
      // let tip = bs.cache("tip");
      // if(tip == 9){}
      wx.navigateTo({
        url:`../../../index/index?id=${id}&user_id=${user_id}`
      })
      // wx.navigateBack({
      //   delta: 2
      // })
    },
    bindlookMore(e){
      // 查看更多机构
      wx.showToast({
        title: '暂时没有更多了',
        icon: 'none',
        duration: 2000
      })
    },
    onLoad: function (options) {
      bs.setTitle("文章");
      if (options.type) {
        this.getArticle(options.id,options.type)
      } else {
        this.getData(options.id)
      }
    },
    // 获取数据
    getData(id) {
      var that = this;
      request.request({
        site: "article_cats",
        data: {
          id: id,
        }
      }, function (res) {
        that.setData({ ...res ,isArticle:true})
      })
    },
    getArticle(id,type) {
      var that = this;
      request.request({
        site: "CurriculumDetails",
        data: {
          curriculum_id: id,
          type
        }
      }, function (res) {
        var article = res.curriculum.details;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({ ...res ,isArticle:false})
      })
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
  onShareAppMessage: function () {
    var user_id = bs.cache("user_id")
    var id = this.article.school_id;
    /* if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    } */
    return {
      imageUrl:"../../../imgs/a.jpg",
      title: '机器人培训班',
      // path: `pages/terrace/terrace?user_id=${user_id}&id=${id}`
      path: `pages/index/index?user_id=${user_id}&id=${id}&target=article`
    }
  }
})