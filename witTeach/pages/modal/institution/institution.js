// pages/modal/institution/institution.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls:['../../imgs/a.jpg','../../imgs/b.jpg'],
    data:{
      name:'长郡中学',call:"18673417231",loc:"南门口",schoolCet:"学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介学校简介",edu:[
        {pic:"../../imgs/a.jpg",courseName:"语文",state:"课程简介：说的分手的方式发生",cost:"998",price:"288"},
        {pic:"../../imgs/a.jpg",courseName:"语文",state:"课程简介：说的分手的方式发生说的分手的方式发生说的分手的方式发生说的分手的方式发生",cost:"998",price:"288"},],
      nearby:[
        {pic:"../../imgs/a.jpg",title:"长郡中学",loc:"课程简介：说的分手的方式发生",call:"998",},{pic:"../../imgs/a.jpg",title:"长郡中学",loc:"课程简介：说的分手的方式发生",call:"998",},
      ],
    },
    ind:1,
    more:1,
    money:1,
    flag:false,
    orgtype:["机构类型a","机构类型2","机构类型3"],
    picker:true,  // 三角箭头切换
    apply:"",   // 1,入驻 2，报名 3，抢购
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindenter(e){
      // 机构入驻
      this.setData({
        flag:true,toast:1,apply:1,placeholder:"请输入机构名称",
        title:"优质机构入驻申请",
      })
    },
    bindsale(e){
      // 抢购
      var coursename = e.currentTarget.dataset.coursename;
      var price = e.currentTarget.dataset.price;
      this.setData({
        flag:true,toast:1,apply:3,placeholder:"请输入姓名",
        title:"购买课程",coursename,price
      })
    },
    bindslide(e) {
      wx.navigateTo({
        url:"/pages/article/article"
      })
    },
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
    bindconsult(e){
      // 咨询预约
      this.setData({
        flag:true,toast:1,apply:2,placeholder:"请输入您的姓名",
        title:"报名信息",
      })
    },
    bindmore(e){
      // 学校简介更多
      this.setData({more:2})
    },
    bindmoney(e){
      // 钱
      wx.navigateTo({
        url:"/pages/indent/indent"
      })
    },
    bindtitle(e){
      // 录入机构名称
      console.log(e)
    },
    bindphone(e){
      // 录入机构电话
      console.log(e)
    },
    bindtype(e){
      // 机构类型
      var index = Number(e.detail.value);
      var org = this.data.orgtype[index];
      this.setData({org})
    },
    binddetails(e){
      var ind = this.data.ind;
      var url = "";
      /* if(ind == 1) return false;
      if(ind ==2){
        url = "/pages/article/article"
      } else */
      if (ind == 3) {
        url="/pages/advisory/advisory"
      } else {
        url = "/pages/article/article"
      }
      wx.navigateTo({
        url:url
      })
    },
    bindsubmit(e){
      // 提交机构入驻
      var org = this.data.org;
      var title = this.data.title;
      var phone = this.data.title;
      console.log(org,title,phone)
      if(this.data.apply == 3){
        this.bindtoastoff();
      }else{
        this.setData({toast:2})
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
      var index = e.currentTarget.dataset.index;
      this.setData({ind:index})
    },
    getData(e) {
      console.log(2,e)
      // this.setData({data:e})
      this.triggerEvent('getData')
    },
  }
})
