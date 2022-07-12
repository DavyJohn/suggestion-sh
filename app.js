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
          wx.request({
            url:  this.globalData.baseUrl+ '/api/weixin/openid',
            data: {
              js_code: res.code,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              let data = JSON.parse(res.data)
              wx.setStorageSync('openid', data.openid)
              wx.setStorageSync('session_key', data.session_key)
            }
            // fail :(error) =>{
            //   console.log('loginerror')
            //   console.log(error)
            // }
          })
        }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl:'https://localhost:8000' 
    // baseUrl:'https://31p4663h68.oicp.vip:8000' 
    baseUrl:'https://sugg.suhang.com.cn:8000'
  }
})
