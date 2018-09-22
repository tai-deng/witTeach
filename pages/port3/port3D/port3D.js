// pages/port3/port3D/port3D.js
import request from "../../../utils/request.js";
import bs from "../../../utils/base.js"
Page({
  data: {
    filTime: 1,
    read:0,
    intention: 0,
    institution: 0,
    content: [
      {img:"../../imgs/a.jpg",title:"文章标题",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:"2.00",refer:"3.00",recommend:"2.00",onLine:"10.00",site:"南湖路口",tuition:"698"},
      {img:"../../imgs/b.jpg",title:"文章标题",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:"2.00",refer:"3.00",recommend:"2.00",onLine:"10.00",site:"南湖路口",tuition:"698"},
      {img:"../../imgs/a.jpg",title:"文章标题",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:"2.00",refer:"3.00",recommend:"2.00",onLine:"10.00",site:"南湖路口",tuition:"698"},
      {img:"../../imgs/b.jpg",title:"文章标题",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:"2.00",refer:"3.00",recommend:"2.00",onLine:"10.00",site:"南湖路口",tuition:"698"},
      {img:"../../imgs/b.jpg",title:"文章标题",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:"2.00",refer:"3.00",recommend:"2.00",onLine:"10.00",site:"南湖路口",tuition:"698"},
      {img:"../../imgs/a.jpg",title:"文章标题",introduce:"介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍",share:"2.00",refer:"3.00",recommend:"2.00",onLine:"10.00",site:"南湖路口",tuition:"698"},
    ]
  },
  onLoad: function (options) {
    this.getData(options.id);
    this.bindenter();
    bs.setTitle(bs.cache("title"));
  },
  // 获取数据
  getData(id, type = 1, sort ='DESC',type_id='',Search='') {
    var that = this;
    id = id ? id : this.data.id;
    let tel = bs.cache("user_phone");
    request.request({
      site: "AgentSchoolList",
      data: {
        school_id: id,
        tel:tel,
        type: type,
        type_id: type_id,
        Search: Search,
        sort:sort,
      }
    }, function (res) {
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
      url=`../port3C/port3C?id=${id}`;
    }else if (direction == 4) {
      url;
    }
    if (url) {
      wx.reLaunch({
        url: url,
      })  
    }
  },
  bindsearch(e) {
    var search = e.detail.value;
    this.setData({search})
  },
  bindsearchGo(e) {
    var search = this.data.search;
    if (search) {
      this.getData(this.data.id,1,'DESC',"",search)
    }
  },
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
    this.setData({filTime,read:0,intention:0,institution:0})
    this.getData(this.data.id,1,sort)
  },
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
    this.setData({filTime:0,read,intention:0,institution:0})
    this.getData(this.data.id,2,sort)
  },
  bindintention(e) {
    var intention = this.data.intention;
    var sort = 'DESC';
    if (intention == 1) {
      intention = 2;
      sort = 'ASC'
    } else {
      intention = 1;
      sort = 'DESC'
    }
    this.setData({filTime:0,read:0,intention,institution:0})
    this.getData(this.data.id,3,sort)
  },
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
    this.setData({ filTime: 0, read: 0, intention: 0, institution })
    this.getData(this.data.id,4,"DESC",orgtypes[index].id)
  },
  bindcontent(e) {
    // 跳转文章详情
    let id = this.data.id;
    wx.navigateTo({
      url:`../../terrace/terrace?id=${id}`
    })
  },
  catchloc(e) {
    // 地图导航
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
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