
import bs from './base.js';
const config = {
  url: "https://hj.wocon.cn/",
    cid: "547a339ff29f2d584dga25471ffac9bf1ad",
}
//api/Huijiao
const request = (obj, callback) => {
    if (bs.cache('mstr')) {
        if (typeof callback == 'function') {
            obj.data.mstr = bs.cache('mstr');
            obj.site = 'api/Huijiao/' + obj.site;
            wx.showLoading({
                title: '加载中',
            })
            wx.request({
                url: config.url + obj.site,
                data: obj.data,
                method:"POST",
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    wx.hideLoading();
                    if (res.data.errcode == 0) {
                        if (callback) {
                            callback(res.data.data);
                        }
                    } else {
                        if(res.data.info){
                            wx.showToast({
                                title: res.data.info,
                                icon: 'loading',
                                duration: 2000
                            })
                        }else{
                            console.log('errey->',res.data)
                        }
                    }
                }, complete() {
                    wx.hideNavigationBarLoading();
                }
            })
        }
    } else {
        wx.login({
            success: function(res) {
                if (res.code) {
                    wx.request({
                        url: config.url + 'sign_in',
                        data: {
                            js_code: res.code ,
                            cid: config.cid
                        },
                        method:"POST",
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function (res) {
                            if (res.data.errcode == 0) {
                                // wx.setStorageSync('mstr', res.data.data.mstr);
                                bs.cache('mstr', res.data.data.mstr)
                                if (typeof callback == 'function') {
                                    obj.data.mstr = bs.cache('mstr');
                                    obj.site = 'api/Huijiao/' + obj.site;
                                    wx.request({
                                        url: config.url + obj.site,
                                        data: obj.data,
                                        method:"POST",
                                        header: {
                                            'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                            if (res.data.errcode == 0) {
                                                if (callback) {
                                                    callback(res.data.data);
                                                }
                                            } else {
                                                if(res.data.info){
                                                    wx.showToast({
                                                        title: res.data.info,
                                                        icon: 'loading',
                                                        duration: 2000
                                                    })
                                                }else{
                                                    console.log('errey->',res.data)
                                                }
                                            }
                                        }, complete() {
                                            wx.hideNavigationBarLoading();
                                        }
                                    })
                                }
                            } else {
                                wx.showToast({
                                    title: res.data.info,
                                    icon: 'loading',
                                    duration: 2000
                                })
                            }
                            console.log(res)
                        }
                    })
                } else {
                    wx.showToast({
                        title: '登录失败，请重试',
                        icon: 'loading',
                        duration: 2000
                    })
                }
            }
        });
    }
}

const toast = (title) => {
    wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
    })
}


module.exports = {
    request,config,toast
  }