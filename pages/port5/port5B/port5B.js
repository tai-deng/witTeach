// pages/port4/port4B/port4B.js
import bs from "../../../utils/base.js"
import request from "../../../utils/request.js"
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
    ],
    click: true,
    orgtypes: [
      {id:1,name:"平台"},
      {id:2,name:"机构"},
      {id:3,name:"老师"}
    ]
  },
  onLoad: function (options) {
    this.getData(options.id);
    this.bindenter();
    bs.setTitle(bs.cache("title"));
  },
  getData(id,type=1,sort="DESC",type_id="",search="") {
    var that = this;
    var tel = bs.cache("user_phone");
    id = id ? id : this.data.id;
    request.request({
      site: "Student_article",
      data: {
        school_id:id,
        tel: tel,type,sort,type_id,search
      }
    }, function (res) {
      that.setData({data:res,id})
    })
  },
  bindtab(e) {
    var index = e.currentTarget.dataset.index;
    var id = this.data.id;
    var url = "";
    if (index == 2) {
      return false;
    }
    if (index == 1) {
      url = `../port5?id=${id}`
    }
    if (index == 3) {
      url = `../port5C/port5C?id=${id}`
    }
    wx.reLaunch({
      url: url,
    })
  },
  bindsearch(e) {
    var search = e.detail.value;
    this.setData({search})
  },
  searchG0(e) {
    // 开始搜索
    var title = this.data.search;
    this.getData(this.data.id,1,"DESC","",title)
  },
  bindadd(e) {
    // 添加内容
    var that = this;
    if (this.data.click) {
      this.setData({ click: false })
      wx.navigateTo({
        url: "../edit/edit",
        complete() {
          setTimeout(function () {
            that.setData({click:true})
          },500)
        }
      })
    }
  },
  bindfilTime(e) {
    var filTime = this.data.filTime;
    let sort = "DESC";
    if (filTime == 1) {
      filTime = 2;
      sort = 'ASC'
    } else {
      filTime = 1;
      sort = 'DESC'
    }
    this.setData({ filTime, read: 0, intention: 0, institution: 0 })
    this.getData(this.id,1,sort)
  },
  bindread(e) {
    var read = this.data.read;
    let sort = "DESC";
    if (read == 1) {
      read = 2;
      sort = 'ASC'
    } else {
      read = 1;
      sort = 'DESC'
    }
    this.setData({filTime:0,read,intention:0,institution:0})
    this.getData(this.id,2,sort)
  },
  bindintention(e) {
    var intention = this.data.intention;
    let sort = "DESC";
    if (intention == 1) {
      intention = 2;
      sort = 'ASC'
    } else {
      intention = 1;
      sort = 'DESC'
    }
    this.setData({filTime:0,read:0,intention,institution:0})
    this.getData(this.id,3,sort)
  },
  bindinstitution(e) {
    var orgtype = this.data.orgtype;
    var orgtypes = this.data.orgtypes;
    var index = Number(e.detail.value);
    var institution = this.data.institution;
    let sort = "DESC";
    if (institution == 1) {
      institution = 2;
      sort = 'ASC'
    } else {
      institution = 1;
      sort = 'DESC'
    }
    this.setData({filTime:0,read:0,intention:0,institution})
    this.getData(this.data.id,4,sort,orgtypes[index].id)
  },
  bindcontent(e) {
    // 跳转文章详情
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`../../article/article?id=${id}`
    })
  },
  // 获取机构类型
  bindenter(e) {
    /* if (!this.data.orgtype) {
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
    } */
    let orgtypes = this.data.orgtypes;
    var arr = [];
    orgtypes.forEach(element => {
      arr.push(element.name)
    });
    this.setData({ orgtype: arr,})
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