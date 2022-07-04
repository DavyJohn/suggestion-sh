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
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxb35321edd30d9cc2',
              secret: 'eae0e294ada81e82da0ebc58bded0e1e',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('session_key', res.data.session_key)
            }
          })
        }
    })
  },
  globalData: {
    userInfo: null
  }
})
