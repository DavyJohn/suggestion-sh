// app.js
// var utils = require('../suggestion-sh/utils/util')
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
        success: (res) => {
          // console.log('微信登录')
          // console.log(this.globalData.baseUrl+ 'api/weixin/openid')
          wx.request({
            url:  this.globalData.baseUrl+ 'api/weixin/openid',
            data: {
              js_code: res.code,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('session_key', res.data.session_key)
            },
            // fail :(error) =>{
            //   wx.showToast({
            //     title: '网络开了小差',
            //     icon:'error',
            //     duration: 1000,
            //     mask:true
            //   })
            // }
          })
        }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl:'https://31p4663h68.oicp.vip:8000' 
    baseUrl:'https://sugg.suhang.com.cn:8000'
  }
})
