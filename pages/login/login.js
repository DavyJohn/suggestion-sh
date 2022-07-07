Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 申请用户授权并将用户信息保存在本地缓存
     */
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorage({
            key: 'nickName',
            data: res.userInfo.nickName
          })
          wx.setStorage({
            key: 'avatarUrl',
            data: res.userInfo.avatarUrl
          })

          //关闭当前页面或者跳转到index
          wx.redirectTo({
            url: '../index/index',
          })
        }
      })
    }
})