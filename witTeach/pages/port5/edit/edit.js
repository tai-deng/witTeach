// pages/port5/edit/edit.js
import request from "../../../utils/request.js"
import bs from "../../../utils/base.js";
Page({
  data: {
    isOn: [],
    nameId: [],
    upload: 2,
    upUrl:'',
  },
  onLoad: function (options) {
    bs.setTitle(bs.cache("title"));
    this.getData();
  },
  bindinput(e) {
    var leave = e.detail.value.trim();
    var sub = this.data.sub;
    if (leave.length > 0) {
      sub = true;
    } else {
      sub = false;
    }
    this.setData({leave,sub})
  },
  binddel(e) {
    let upload = this.data.upload;
    if (upload == 2) {
      this.setData({imageData:'',upUrl:''})
    }
    if (upload == 1) {
      this.setData({videoData:'',upUrl:''})
    }
  },
  bindsearch(e) {
    let text = e.detail.value.textarea;
    var sub = this.data.sub;
    var that = this;
    if (sub && that.data.upUrl) {
      let that = this;
      request.request({
        site: "PublishArticleAdd",
        data: {
          content: that.data.leave,
          url: that.data.upUrl,
          type: that.data.upload,
          is_on: that.data.isOn.join(),
          name_id:that.data.nameId.join(),
        }
      }, function (res) {
        console.log(res)
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success(e) {
              that.cancel();
            }
          })
        })
    } else if(!sub){
      wx.showToast({
        title: '请录入内容',
        icon: 'none',
        duration: 2000
      })
    } else if (!that.data.upUrl) {
      wx.showToast({
        title: '请上传一张图片或，视频',
        icon: 'none',
        duration: 2000
      })
    }
  },
  cancel(e) {
    wx.navigateBack({
      data:2,
    })
  },
  bindTab(e) {
    let index = e.currentTarget.dataset.index;
    let upload = this.data.upload;
    if (upload != index) {
      this.setData({ upUrl: '', imageData:'',videoData:''})
    }
    this.setData({upload:index})
  },
  addImg(e) {
    let upload = this.data.upload;
    if (upload == 1) {
      this.uploadVideo();
    } else if(upload == 2){
      this.uploadImage();
    }
  },
  // 上传图片
  uploadImage() {
    console.log('上传图片')
    let imageData = this.data.imageData;
    let that = this;
    let img = this.data.img;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '图片上传中',
        })
        let tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: request.config.url + 'api/huijiao/uploadFileUser',
            filePath: tempFilePaths[0],
            name: 'image',
            formData:{ 
              mstr: bs.cache("mstr"),
            },
            success (res) {
              wx.hideLoading()
              if(res.data == "上传文件大小不符！"){
                wx.showToast({
                  title: '上传文件大小不符！',
                  image: 'none',
                  duration: 2000
                })
              }else{
                imageData=request.config.url + JSON.parse(res.data).data.img;
                img=JSON.parse(res.data).data.img;
                console.log(img,imageData,JSON.parse(res.data).data)
                that.setData({
                  imageData:imageData,
                  upUrl:img
                })
              }
            }
          })
      }
    })
  },
  // 上传视频
  uploadVideo() {
    console.log('上传视频')
    let videoData = this.data.videoData;
    let that = this;
    let video = this.data.video;
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      success: function (res) {
        wx.showLoading({
          title: '视频上传中',
        })
        let tempFilePaths = res.tempFilePath;
        wx.uploadFile({
          url: request.config.url + 'api/huijiao/uploadFile',
          filePath: tempFilePaths,
          name: 'video',
          formData:{ 
            mstr: bs.cache("mstr"),
          },
          success(res) {
            wx.hideLoading()
            if(res.data == "上传文件大小不符！"){
              wx.showToast({
                title: '上传文件大小不符！',
                image: 'none',
                duration: 2000
              })
            }else{
              let videoFile = JSON.parse(res.data);
              videoData=request.config.url + videoFile.data.vido;
              video=videoFile.data.vido;
              console.log(video,videoData)
              that.setData({
                videoData:videoData,
                upUrl:video
              })
            }
          }
        })
      }
    })
  },
  // 图片预览
  preview(e) {
    var imgs = this.data.imageData;
    var arr = [imgs];
    if (this.upload == 2) return;
    wx.previewImage({
      current: imgs,
      urls: arr
    })
  },
    // 谁可以看
  limits(e) {
    let limits = this.data.limits;
    console.log("limits",limits)
    this.setData({
      list:limits,
      flag: true,
      state:true,
    })
  },
    // 提醒谁看
  reminds(e) {
    let warn = this.data.warn;
    this.setData({
      list:warn,
      flag:true,
      state:false,
    })
  },
  cancelBB(e) {
    this.setData({
      flag:false,
    })
  },
  // 修改数据
  bindchange(e) {
    let index = e.currentTarget.dataset.index;
    let state = this.data.state;
    let status = e.detail.value;
    let list = this.data.list;
    let arr = [];
    let isOn = this.data.isOn;
    let nameId = this.data.nameId;

    if (state) {
      if (status) {
        isOn.push(list[index])
      } else {
        if (isOn.length > 0) {
          for (let i = 0; i < isOn.length; i++){
            if (list[index].id != isOn[i].id) {
              arr.push(isOn[i]);
            }
          }
          isOn = arr;
        }
        isOn = [];
      }
      this.setData({ isOn })
      
    } else {
      if (status) {
        nameId.push(list[index])
      } else {
        if (nameId.length > 0) {
          for (let i = 0; i < nameId.length; i++){
            if (list[index].id != nameId[i].id) {
              arr.push(nameId[i]);
            }
          }
          nameId = arr;
        }
        nameId = [];
      }
      this.setData({nameId})
    }
  },
  // 确认选择
  bindFlagBB(e) {
    let nameId = this.data.nameId;
    let isOn = this.data.isOn;
    this.cancelBB();
    console.log(nameId,isOn);
  },
  getData() {
    let that = this;
    request.request({
      site: "PublishArticle",
      data: {}
    }, function (res) {
      that.setData({ warn: res.name, limits:res.type})
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