
const bf = '0.0.1';
// 设置导航标题
const setTitle = title =>{
  wx.setNavigationBarTitle({
    title: title
  })
}
// 获取手机信息
const systemInfo = (size,self) => {
  wx.getSystemInfo({
    success: function (res) {
      var width = 750 / res.windowWidth;
      var height = res.windowHeight * 2 - size;
      self.setData({height})
    }
  })
}
// 打开内置地图
const openLocation = (loc) => {
  var latitude = Number(loc.currentTarget.dataset.latitude);
  var longitude = Number(loc.currentTarget.dataset.longitude);
  wx.openLocation({
    longitude: longitude,
    latitude: latitude,
    scale: 28
  })
}
// 28.2217500000,112.9356100000
// 打电话
const call = (call) => {
  wx.makePhoneCall({phoneNumber: call.currentTarget.dataset.phone})
}

// 缓存处理
const cache = function(name,value) {
  if (!wx.getStorageSync(bf)) {
    wx.setStorageSync(bf, {})
  }
  if (arguments.length === 2) {
    set(name,value)
  }
  if (arguments.length === 1) {
    return get(name);
  }
  function set(name,value) {
    let temp = wx.getStorageSync(bf);
    temp[name] = value;
    wx.setStorageSync(bf, temp)
  }

  function get(name) {
    let temp = wx.getStorageSync(bf);
    return temp[name];
  }
}


// 保留两位小数
const toFx = (num)=>{
  return num.toFixed(2)
}

module.exports = {
  setTitle,systemInfo,openLocation,call,cache,toFx
}