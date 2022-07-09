const app = getApp()
var utils = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName: '', // 用户昵称
        avatarUrl: '', // 头像地址
        suggestions: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 从本地缓存读取用户信息
        wx.getStorage({
            key: 'nickName',
            success: (res) => {
                this.setData({
                    nickName: res.data
                })
            }
        })
        wx.getStorage({
            key: 'avatarUrl',
            success: (res) => {
                this.setData({
                    avatarUrl: res.data
                })
            }
        })

        

        // 获取建议列表
        let openid = wx.getStorageSync('openid')
        let that = this
        wx.request({
            url: app.globalData.baseUrl+'/api/suggestions/someuser',
            data: {
                openid: openid
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              
              console.log(res)
                that.setData({
                suggestions: res.data
              })
            },
            fail :(error) =>{
              utils.showToasts(2,'网络开了小差')
            }
          })
    }
})