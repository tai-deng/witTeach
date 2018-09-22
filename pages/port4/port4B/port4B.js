// pages/port4/port4B/port4B.js
import request from "../../../utils/request.js";
import bs from "../../../utils/base.js";
Page({
  data: {
    filTime: 1,
    read:0,
    intention: 0,
    institution: 0,
    content: [
      {img:"../../imgs/a.jpg",title:"文章标题",date:"2018-05-22",time:"22:10",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:20,read:30,intention:2},
      {img:"../../imgs/b.jpg",title:"文章标题",date:"2018-05-22",time:"22:10",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:20,read:30,intention:2},
      {img:"../../imgs/a.jpg",title:"文章标题",date:"2018-05-22",time:"22:10",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:20,read:30,intention:2},
      {img:"../../imgs/a.jpg",title:"文章标题",date:"2018-05-22",time:"22:10",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:20,read:30,intention:2},
    ]
  },
  onLoad: function (options) {
    this.getData(options.id);
    this.bindenter();
    bs.setTitle(bs.cache("title"));
  },
  bindtab(e) {
    var index = e.currentTarget.dataset.index;
    var id = this.data.id;
    var url = "";
    if (index == 2) {
      return false;
    }
    if (index == 1) {
      url = `../port4?id=${id}`
    }
    if (index == 3) {
      url = `../port4C/port4C?id=${id}`
    }
    wx.reLaunch({
      url: url,
    })
  },
  // 搜索内容
  bindsearch(e) {
    console.log(e)
    var title = e.detail.value.search;
    var school_id = this.data.id;
    request.request({
      site: "article_search",
      data: {
        title,school_id,
      }
    }, function (res) {
      that.setData({data:res})
    })
  },
  // 时间排序
  bindfilTime(e) {
    var filTime = this.data.filTime;
    var sort = 'DESC';
    if (filTime == 1) {
      filTime = 2;
      sort = 'ASC'
    } else {
      filTime = 1;
      sort = 'DESC'
    }
    this.getData(this.data.id,1,sort)
    this.setData({filTime,read:0,intention:0,institution:0})
  },
  // 阅读量排序
  bindread(e) {
    var read = this.data.read;
    var sort = 'DESC';
    if (read == 1) {
      read = 2;
      sort = 'ASC'
    } else {
      read = 1;
      sort = 'DESC'
    }
    this.getData(this.data.id,2,sort)
    this.setData({filTime:0,read,intention:0,institution:0})
  },
  // 意向数排序
  bindintention(e) {
    var sort = 'DESC';
    var intention = this.data.intention;
    if (intention == 1) {
      intention = 2;
      sort = 'ASC'
    } else {
      intention = 1;
      sort = 'DESC'
    }
    this.getData(this.data.id,3,sort)
    this.setData({filTime:0,read:0,intention,institution:0})
  },
  // 机构类型排序
  bindinstitution(e) {
    var orgtype = this.data.orgtype;
    var orgtypes = this.data.orgtypes;
    var index = Number(e.detail.value);
    var institution = this.data.institution;
    if (institution == 1) {
      institution = 2;
    } else {
      institution = 1;
    }
    this.getData(this.data.id,4,"DESC",orgtypes[index].id)
    this.setData({filTime:0,read:0,intention:0,institution})
  },
  // 文章详情
  bindcontent(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`../../article/article?id=${id}`
    })
  },
  // 获取数据
  getData(id, type = 1, sort = "DESC",type_id="") {
    var that = this;
    id = id ? id : this.data.id;
    request.request({
      site: "Teacher_article",
      data: {
        school_id: id,
        type: type,
        sort: sort,
        type_id:type_id,
      }
    }, function (res) {
      that.setData({data:res,id})
    })
  },
  // 获取机构类型
  bindenter(e) {
    if (!this.data.orgtype) {
      var that = this;
      request.request({
        site: "Type",
        data: {}
      }, function (res) {
        var arr = [];
        res.forEach(element => {
          arr.push(element.name)
        });
        that.setData({ orgtype: arr,orgtypes:res})
      })
    }
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