// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
        success: (res) => {
          console.log(res.code)
          wx.request({
            url:  app.globalData.baseUrl+ 'api/weixin/openid',
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
            }
          })
        }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl:'https://31p4663h68.oicp.vip'
    baseUrl:'https://www.suhangsugg.fun:8000'
  }
})
