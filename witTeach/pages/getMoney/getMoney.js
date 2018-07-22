// pages/getMoney/getMoney.js
import bs from "../../utils/base.js";
import request from "../../utils/request.js";
Page({
  data: {
    /* data: {
      moneyId: [
      {name:"张三1",cardNum:"1231231242345235345 0"},
      {name:"张三2",cardNum:"1231231242345235345 1"},
      {name:"张三3",cardNum:"1231231242345235345 2"},
      {name:"张三4",cardNum:"1231231242345235345 3"},
      ]
    }, */
    sub:false,
  },
  onLoad: function (options) {
    bs.setTitle("申请提现");
    this.getData( options.id );
  },
  binddel(e) {
    // 删除
    var that = this;
    var data = this.data.data;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var arr = [];
    data.forEach(element => {
      if (element != data[index]) {
        arr.push(element)
      }
    });
    data = arr;
    request.request({
        site: "BankDel",
        data: {id}
      },
      function (res) {
        that.setData({data})
      }
    )
  },
  binmoneyId(e) {
    // 选择卡片
    var data = this.data.data;
    var index = e.currentTarget.dataset.index;
    var name = data[index].name;
    var bank_name = data[index].bank_name;
    var cardNum = data.moneyId[index].bank_num;
    this.setData({cardNum,name,bank_name})
  },
  bindcarName(e) {
    // 开户名
    var name = e.detail.value.trim();
    var amount = e.detail.value;
    var sub = this.data.sub;
    var cardNum = this.data.cardNum;
    var bank_name = this.data.bank_name;
    if (name && cardNum && amount && bank_name) {
      sub = true;
    } else {
      sub = false;
    }
    this.setData({name,sub})
  },
  bindcarNum(e) {
    // 银行卡号
    var cardNum = e.detail.value.trim();
    var amount = e.detail.value;
    var sub = this.data.sub;
    var name = this.data.name;
    var bank_name = this.data.bank_name;
    if (name && cardNum && amount && bank_name) {
      sub = true;
    } else {
      sub = false;
    }
    this.setData({cardNum,sub})
  },
  bindamount(e) {
    // 提现金额
    var amount = e.detail.value;
    var sub = this.data.sub;
    var cardNum = this.data.cardNum;
    var name = this.data.name;
    var bank_name = this.data.bank_name;
    if (name && cardNum && amount &&　bank_name) {
      sub = true;
    } else {
      sub = false;
    }
    this.setData({amount,sub})
  },
  bindbank_name(e) {
    // 银行
    var bank_name = e.detail.value.trim();
    var amount = this.data.amount;
    var sub = this.data.sub;
    var name = this.data.name;
    var cardNum = this.data.cardNum;
    if (name && cardNum && amount && bank_name) {
      sub = true;
    } else {
      sub = false;
    }
    this.setData({ sub, bank_name })
  },
  bindsumbit(e) {
    // 确定提现
    var id = this.data.id;
    var amount = this.data.amount;
    var cardNum = this.data.cardNum;
    var name = this.data.name;
    var bank_name = this.data.bank_name;
    if (name && cardNum && amount && bank_name) {
      request.request(
        {
          site: "Withdrawal_add",
          data: {
            pid: id,
            account_number: cardNum,
            account_name: bank_name,
            name: name,
            money: amount,
          }
        }, function (res) {
          wx.showModal({
            title: '提交成功',
            content: '我们将在7个工作日内转账到您的账户',
            showCancel:false,
            success: function(res) {
              if (res.confirm) {
                wx.navigateBack({
                  data: 2
                })
              }
            }
          })
        }
      )
    } else {
      if (!amount) {
        wx.showToast({
          title: '请确认金额',
          icon: 'none',
          duration: 2000
        })
      }
      if (!bank_name) {
        wx.showToast({
          title: '请确开户行',
          icon: 'none',
          duration: 2000
        })
      }
      if (!cardNum) {
        wx.showToast({
          title: '请确认卡号',
          icon: 'none',
          duration: 2000
        })
      }
      if (!name) {
        wx.showToast({
          title: '请确认账户名',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  getData(id) {
    let that = this;
    request.request({
        site: "Bank",
        data: {
          pid: id,
        }
      },
      function (res) {
        console.log(res)
        that.setData({
          id: id,
          data:res
        })
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