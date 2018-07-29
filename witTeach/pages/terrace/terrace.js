// pages/terrace/terrace.js
import bs from "../../utils/base.js";
import request from "../../utils/request.js";
Page({
  data: {
    imgUrls:['../imgs/a.jpg','../imgs/b.jpg'],
    data:{
      name:'长郡中学',call:"18673417231",loc:"南门口",schoolCet:"学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介",edu:[
        {pic:"../imgs/a.jpg",courseName:"语文",state:"课程简介：说的分手的方式发生",cost:"998",price:"288"},
        {pic:"../imgs/a.jpg",courseName:"语文",state:"课程简介：说的分手的方式发生说的分手的方式发生说的分手的方式发生说的分手的方式发生",cost:"998",price:"288"},],
      nearby:[
        {pic:"../imgs/a.jpg",title:"长郡中学",loc:"课程简介：说的分手的方式发生",call:"998",},{pic:"../imgs/a.jpg",title:"长郡中学",loc:"课程简介：说的分手的方式发生",call:"998",},
      ],
    },
    ind:1,
    more:1,
    money:1,
    flag:false,
    // orgtype:["机构类型a","机构类型2","机构类型3"],
    picker:true,  // 三角箭头切换
    apply: "",   // 1,入驻 2，报名 3，抢购
    isLogin:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("传值",options)
    /* if (options["user_id"]) {
      this.inlet(options);
    } */
    this.getData(options.id)

    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // // 获取数据
  // getData(id) {
  //   var that = this;
  //   request.request({
  //     site: "School",
  //     data: {
  //       school_id:id
  //     }
  //   }, function (res) { 
  //     that.setData({data:res,id})
  //     that.getTab(1,id);
  //   })
  // },
  // 获取默认数据
  getData(id) {
    bs.setTitle("机构详情");
    let school_id = bs.cache("school_id");
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        bs.cache("latitude",latitude);
        bs.cache("longitude",longitude);
        request.request({
          site: "School",
          data: {
            school_id:school_id,
            latitude,
            longitude,
          }
        }, function (res) {
          that.setData({data:res,id})
          that.getTab(1,id);
        })
      }
    })
  },
  // 机构入驻
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
    this.setData({
      flag:true,toast:1,apply:1,placeholder:"请输入机构名称",
      title:"优质机构入驻申请",
    })
  },
  // 抢购
  bindsale(e){
    // var coursename = e.currentTarget.dataset.coursename;
    // var price = e.currentTarget.dataset.price;
    // this.setData({
    //   flag:true,toast:1,apply:3,placeholder:"请输入姓名",
    //   title:"购买课程",coursename,price
    // })
    var coursename = e.currentTarget.dataset.coursename;
    var price = e.currentTarget.dataset.price;
    var courseId = e.currentTarget.dataset.id;
    this.setData({
      flag:true,toast:1,apply:3,placeholder:"请输入姓名",
      title:"购买课程",coursename,price,courseId
    })
  },
  // 导航
  bindloc(e){
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
  // 咨询预约
  bindconsult(e){
    this.setData({
      flag:true,toast:1,apply:2,placeholder:"请输入您的姓名",
      title:"报名信息",
    })
  },
  // 学校简介更多
  bindmore(e){
    this.setData({more:2})
  },
  // 登录
  bindshunt(e){
    wx.navigateTo({
      url:"../login/login"
    })
  },
  // 钱
  bindmoney(e) {
    // let user_phone = bs.cache("user_phone");
    // if (user_phone != void 0 && user_phone.length == 11) {
    //   wx.navigateTo({
    //     url:"/pages/indent/indent"
    //   })
    // } else {
    //   this.bindshunt();
    // }
    this.bindshunt();
  },
    // 录入机构名称
  bindtitle(e){
    console.log(e)
  },
    // 录入机构电话
  bindphone(e){
    console.log(e)
  },
  // 机构类型
  bindtype(e){
    var index = Number(e.detail.value);
    var org = this.data.orgtype[index];
    var orgtype_id = this.data.orgtypes[index].id;
    this.setData({org,orgtype_id})
  },
  // 详情
  binddetails(e){
    var ind = this.data.ind;
    var url = "";
    let id = e.currentTarget.dataset.id;
    if (ind == 3) {
      url=`/pages/advisory/advisory?id=${id}`
    } else {
      url = `/pages/article/article?id=${id}&type=${ind}`
    }
    wx.navigateTo({
      url:url
    })
  },
  // 提交 1.机构入驻 2.推荐学生 3.购买课程
  bindsubmit(e) {
    let usertel = bs.cache("user_phone")
    var org = this.data.org;      // 机构类型
    var title = e.detail.value.title;  // 姓名
    var phone = e.detail.value.phone;  // 电话
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var that = this;
    var id = this.data.school_id;
    console.log(org,title,phone)
    if (this.data.apply == 3) {
      if (title && myreg.test(phone)) {
        this.payment();
      } else {
        if (!myreg.test(phone)) {
          request.toast('请确认手机号码')
        }
        if (!title) {
          request.toast('请确认姓名')
        }
      }
    }
    if (this.data.apply == 1) {
      if (title && myreg.test(phone) && org) {
        request.request({
          site: "Apply",
          data: {
            type: org,
            name: title,
            tel: phone,
            school_id:id,
          }
        }, function (res) {
          that.setData({ flag: false ,toast:2})
          wx.showModal({
            title: '提示',
            showCancel:false,
            content: "入驻信息提交成功！",
            success: function(res) {
            }
          })
        })
      } else {
        if (!org) {
          request.toast('请确认机构类型')
        }
        if (!myreg.test(phone)) {
          request.toast('请确认手机号码')
        }
        if (!title) {
          request.toast('请确认机构名称')
        }
      }
    }
    if (this.data.apply == 2) {
      if (title && myreg.test(phone)) {
        request.request({
          site: "Recommend",
          data: {
            school_id: id,
            name: title,
            tel: phone,
            usertel
          }
        }, function (res) {
          that.setData({ data: res, flag: false ,toast:2})
          wx.showModal({
            title: '提示',
            showCancel:false,
            content: "推荐信息提交成功！",
            success: function(res) {
            }
          })
        })
      } else {
        if (!myreg.test(phone)) {
          request.toast('请确认手机号码')
        }
        if (!title) {
          request.toast('请确认姓名')
        }
      }
    }
  },
  bindtoastoff(e){
    // 关闭机构入驻弹窗 toast = 1
    this.setData({flag:false})
  },
  bindCall(e){
    // 拨打电话
    var call = e.currentTarget.dataset.phone;
    wx.makePhoneCall({phoneNumber: call})
  },
  bindaway(e){
    // 收起更多
    this.setData({more:1})
  },
  bindtab(e){
    // tab切换
    var school_id = this.data.id;
    var index = e.currentTarget.dataset.index;
    this.getTab(index,school_id)
  },
  // 获取tab数据
  getTab(index,id) {
    var that = this;
    var school_id = id ? id : that.data.id;
    var url = "";
    if (index == 1) {
      url = 'curriculum'
    } else if (index == 2) {
      url = "teacher"
    } else if (index == 3) {
      url = 'article'
    }
    request.request({
      site: url,
      data: {school_id	}
    }, function (res) {
      that.setData({edu:res,ind:index})
    })
  },
  // 跳转文章
  bindslide(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`/pages/article/article?id=${id}`
    })
  },
  // 进入
  inlet(ops) {
    var that = this;
    /* wx.getSetting({
      success(res) {
        console.log("授权",res)
        if (!res.authSetting['scope.userInfo']) {
          that.setData({isLogin:true,ops})
        } else {
          that.shareOrigin(ops);
        }
      }
    }) */

    that.setData({ isLogin: true, ops })
    that.shareOrigin(ops);
  },
  // 授权
  bindgetuserinfo(e) {
    var that = this;
    var userInfo = e.detail.userInfo;
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    wx.login({
      success(res) {
        wx.request({
          url: "https://hj.wocon.cn/sign_in",
          data: {
            iv: iv,
            encrypted_data: encryptedData,
            cid: "547a339ff29f2d584dga25471ffac9bf1ad",
            js_code: res.code,
          },
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log("登录", res)
            bs.cache('user_info', userInfo);
            bs.cache('mstr', res.data.data.mstr);
            that.setData({ isLogin: false });
            // that.shareOrigin(this.ops);
          }
        })
      }
    })
  },
  // 分享分配
  shareOrigin(ops) {
    var my_user = bs.cache("user_info");
      request.request({
        site: "click_share",
        data: {
          school_id: ops.id,
          user_id: ops.user_id,
        }
      }, function (res) {
        console.log("记录分享点击",ops)
      })
  },
  // 支付
payment(e){
  let that = this;
  let courseId = this.data.courseId;
  let coursename = this.data.coursename;
  let name = this.data.name;
  let phone = this.data.phone;
  let price = this.data.price;
  let user_id = bs.cache("user_id");
  console.log("user_id--1",user_id)
  wx.showNavigationBarLoading()
  request.request({
    site: "order_buy",
    data: {
      curriculum_id: courseId,
      curriculum_title: coursename,

      name:name,
      tel: phone,
      price: price,
      user_id:user_id,
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
              that.setData({name:null,phone:null,org:null,toast:2})
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
    // wx.clearStorage();
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
  onShareAppMessage: function (res) {
    var user_id = bs.cache("user_id")
    var id = this.data.id;
    /* if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    } */
    return {
      imageUrl:"../imgs/a.jpg",
      title: '机器人培训班',
      // path: `pages/terrace/terrace?user_id=${user_id}&id=${id}`
      path: `pages/shareIn/shareIn?user_id=${user_id}&id=${id}&target=institution`
    }
  }
})