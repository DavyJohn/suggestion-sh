const app = getApp()
var utils = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName: '', // 用户昵称
        avatarUrl: '', // 头像地址
        suggestions: [],//意见内容
        imageUrls:[],//意见附件
        current:[]
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
              let data = res.data

              // 附件地址处理
              for(let i= 0; i < data.length; i++) {  
                let files = JSON.parse(data[i].files)
                if(files.length !== 0) {
                  for (let j = 0; j < files.length; j++) {
                    let file = JSON.parse(files[j])
                    let path = app.globalData.baseUrl + "/file/" + file['type'] + "/" + file['name']
                    files[j] = path
                  }
                }
                data[i].files = files
              }

              console.log(data)

              that.setData({
                suggestions: data,
              })
            },
            fail :(error) =>{
              utils.showToasts(2,'网络开了小差')
            }
          })    
    },

      preview(event){
      let that  = this
      let currentUrl = event.currentTarget.dataset.src
      console.log(event.currentTarget.dataset.src)
      wx.previewImage({
          current : currentUrl ,// 当前显示图片的http链接
          urls: [currentUrl] // 需要预览的图片http链接列表
        // success : res =>{
        //   console.log('success')
          
        // },
      
        })
    },
})

//   //获取sugg中的图片
// function getImageUrls(data,that){
//     let urls  = [] 
//     // 遍历 suggesstions 再拼接字符串
//     for(let i= 0;i<data.length;i++){  
//       if(JSON.parse(data[i].files).length === 0) {
//         urls.push(JSON.parse(data[i].files))
//       } else {
//         let files = JSON.parse(data[i].files)
//         for (let j = 0; j < files.length; j++) {
//           let file = JSON.parse(files[j])
//           let path = app.globalData.baseUrl + "/file/" + file['type'] + "/" + file['name']
//           files[j] = path
//         }
//         urls.push(files)
//       }

//       that.setData({
//         imageUrls : urls
//       })
//       // console.log(urls)

//       // urls.push(data[i].files)
//       // that.setData({
//       //   imageUrls : urls
//       // })
//       // for(let j = 0;j<urls.length)
//     }
//     console.log(that.data.imageUrls)

//   }