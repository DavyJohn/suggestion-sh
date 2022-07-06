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
              appid: 'wx11ca4869e1818b99',
              secret: '66e180e158e0586b0cd7d4b5bc167c3e',
              js_code: res.code,
              grant_type: 'authorization_code'
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
    userInfo: null
  }
})
