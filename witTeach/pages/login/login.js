// pages/login/login.js
import bs from "../../utils/base.js";
import request from "../../utils/request";
const app = getApp();
Page({
  data: {
    getcnt: "获取验证码",
    ti: 60,
    // phone: 15873095325,
    auth: false,
    is_phone:false,
  },
  bindfocusA(e) {
    this.setData({sel:1})
  },
  // 登录
  bindauth(e) {
    var is_phone = this.data.is_phone;
    var that = this;

    var phone = this.data.phone;
    var authCode = this.data.authCode;
    var mid = this.data.mid;
    var time = this.data.time;
    if (mid && time) {
      if (is_phone && authCode) {
        request.request({
          site: "verifyNote",
          data: {
            tel: phone,
            verify_code: authCode,
            mid: mid,
            time: time,
          }
        }, function (res) {
          console.log(res)
          bs.cache('user_phone', phone);
          bs.cache('pid', res.id);
          bs.cache('title', res.name);
          bs.cache("user_id", res.user_id);
          bs.cache("tip", res.type);
          bs.cache("school_id", res.school_id);
          that.onRoute(res.type);
        })
      } else {
        if (!authCode) {
          wx.showToast({
            title: '请输入验证码',
            icon: 'none',
            duration: 2000
          })
        }
        if (!is_phone) {
          wx.showToast({
            title: '请输入正确的手机号码',
            icon: 'none',
            duration: 2000
          })
        }
      }
    } else {
      wx.showToast({
        title: '请获取验证码',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 手机号码验证
  bindblur(e) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var phone = this.data.phone;
    var auth = this.data.auth;
    var is_phone = this.data.is_phone;
    var tirm = this.data.tirm;
    if (!myreg.test(phone)) {
      is_phone = false;
      if (!tirm) {
        auth = false;
      }
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (!tirm) {
        auth = true;
      }
      is_phone = true;
    }
    this.setData({sel:0,auth,is_phone})
  },
  bindfocusB(e) {
    this.setData({sel:2})
  },
  // 输入手机号码
  bindinputA(e) {
    var phone = e.detail.value.trim();
    this.setData({phone})
  },
  // 输入验证码
  bindinputB(e) {
    var authCode = e.detail.value.trim();
    this.setData({authCode})
  },
  // 重新输入手机号码
  bindbad(e) {
    // var phone = this.data.phone;
    this.setData({phone:""})
  },
  // 获取验证码
  bindgetuserinfo(e) {
    var userInfo = e.detail.userInfo;
    var phone = this.data.phone;
    var getcnt = this.data.getcnt;
    var auth = this.data.auth;
    var that = this;
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    var code = app.globalData.code;
    if (userInfo && auth) {
        wx.request({
          url: "https://hj.wocon.cn/sign_in",
          data: {
            iv: iv,
            encrypted_data: encryptedData,
            cid: "547a339ff29f2d584dga25471ffac9bf1ad",
            js_code:code,
          },
          method:"POST",
          header: {
              'content-type': 'application/json'
          },
          success: function (res) {
            bs.cache('user_info', userInfo);
            bs.cache('mstr', res.data.data.mstr);
          }
      })
      request.request({
        site: "Log_in",
        data: {
          tel: phone,
        }
      }, function (res) {
        console.log("获取验证码成功！",res)
        that.setData({
          phone: res.tel,
          time: res.time,
          mid: res.mid,
          verify_code: res.verify_code,
          
        })
        var tirm = setInterval(function () {
          var ti = that.data.ti;
          ti--;
          if (ti < 10) {
            getcnt = `等待${ti}秒`;
          } else {
            getcnt = `等待${ti}秒`;
          }
          that.setData({ti,getcnt,auth:false,tirm})
          if (ti == 0) {
            getcnt = "获取验证码";
            clearInterval(tirm);
            that.setData({auth:true,getcnt,ti:60})
          }
        },1000)
      })
    } else {
      if (!auth) {
        wx.showToast({
          title: '请确认手机号码',
          icon: 'none',
          duration: 2000
        })
      }
      if (!userInfo) {
        wx.showToast({
          title: '请授权个人信息',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  // Route
  onRoute(dir){
    let url = "";
    let school_id = bs.cache("school_id");
    if (dir == 2) {
      // 学校总代端 2端
      url = `../manage/manage?id=${school_id}`;
    }
    if (dir == 1) {
      // 推广设置 1端
      url = `../texture/texture?id=${school_id}`;
    }
    if (dir == 5 || dir == 7 || dir == 8) {
      // 省市区代理 4端
      url = `../port3/port3B/port3B?id=${school_id}`;
    }
    if (dir == 3) {
      // 老师学生收益 3端
      url = `../port4/port4?id=${school_id}`;
    }
    if (dir == 4) {
      // 学校老师端 4端
      url = `../port5/port5?id=${school_id}`;
    }
    if (dir == 6) {
      // 分享游客端
      // url = `pages/manage/teacher/teacher?id=${school_id}`;
      url = `pages/index/index?id=${school_id}&show=0`;
    }
    if (dir == 9) {
      // 家长端
      url = `../indent/indent?id=${school_id}`;
    }
    wx.reLaunch({
      url: url
    })
  },
  onLoad: function (options) {
    let tip = bs.cache("tip");
    if(tip){
      this.onRoute(tip);
    }
    if (options.id) {
      wx.showToast({
        title: '分享用户',
        icon: 'success',
        duration: 2000
      })
    }
  },
  // submit
  formSubmit(event){
    let phone = event.detail.value.phone;
    let code = event.detail.value.code;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var that = this;
    var mid = this.data.mid;
    var time = this.data.time;

    if (mid && time) {
      if (myreg.test(phone) && code) {
        request.request({
          site: "verifyNote",
          data: {
            tel: phone,
            verify_code: code,
            mid: mid,
            time: time,
          }
        }, function (res) {
          bs.cache('user_phone', phone);
          bs.cache('pid', res.id);
          bs.cache('title', res.name);
          bs.cache("user_id", res.user_id);
          bs.cache("tip", res.type);
          bs.cache("school_id", res.school_id);
          that.onRoute(res.type);
        })
      } else {
        if (!code) {
          wx.showToast({
            title: '请输入验证码',
            icon: 'none',
            duration: 2000
          })
        }
        if (!myreg.test(phone)) {
          wx.showToast({
            title: '请输入正确的手机号码',
            icon: 'none',
            duration: 2000
          })
        }
      }
    } else {
      wx.showToast({
        title: '请获取验证码',
        icon: 'none',
        duration: 2000
      })
    }
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
  
  }
})