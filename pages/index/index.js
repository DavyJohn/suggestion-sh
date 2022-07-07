const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authDialogVisible: true, // 是否显示授权弹框
    localFilePaths: [],
    serverFilePaths: [],
    files: [], // 即将上传的文件列表
    indexTitle:[] ,
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    
    // nickName:''
  },
  onLoad() {
    let that= this

    // 判断用户是否授权，未授权时，向用户申请授权
    wx.getSetting({
      success: (res) => {
        let nickName =  wx.getStorageSync('nickName')
         //如果没有授权以及本地缓存没有用户信息
        if (!res.authSetting['scope.userInfo'] || !nickName ) {  
          //选择跳转到登陆界面
          console.log('选择跳转到登陆界面')
          wx.showModal({
            title: '欢迎使用意见箱',
            content: '用户您好，为了保证您意见数据的安全性，需要您授权登录才能使用核心功能。',
            confirmText: '同意',
            cancelText: '拒绝',
            success (res) {
              console.log(res)
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }
            }
            
          })
        }
      }
    }),
    wx.request({ 
      url: app.globalData.baseUrl+'/api/dict',
      method:'GET',
      data:{
        page:0,
        size:10,
        sort:'id,desc',
        blurry:'suggestion_tip'
      },
      header:{
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.content[0].description)
        that.setData({
          indexTitle : res.data.content[0].description
        })
      },
      fail:function(error){
        console.log(error)
      }
    })

  },

  /**
   * 选择文件
   */
  chooseFile(e) {
    let that = this //获取上下文
    let files = that.data.files
    let localFilePaths = that.data.localFilePaths
    wx.chooseMedia({
      count: 8,
      sizeType: ['compressed'],
      success: res => {
        let tempFiles = res.tempFiles
        for (let i in tempFiles) {
          files.push(tempFiles[i])
          localFilePaths.push(tempFiles[i].tempFilePath)
        }
        that.setData({
          files: files,
          localFilePaths: localFilePaths
        });
      }
    })
  },
  
  /**
   * 上传文件
   */
  uploadFile(filePath) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: app.globalData.baseUrl+'/api/suggestions/file',
        filePath: filePath,    
        name: 'file',   
        success: (res) => {
          let serverFilePaths = this.data.serverFilePaths;
          serverFilePaths.push(res.data)
          that.setData({
            serverFilePaths
          })
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  
  /**
   * 删除文件
   */
  deleteFile(e) {
    let files = this.data.files;
    let localFilePaths = this.data.localFilePaths;
    let index = e.currentTarget.dataset.index;
    files.splice(index, 1);
    localFilePaths.splice(index, 1);
    this.setData({
      files: files,
      localFilePaths: localFilePaths
    });
  },

  /**
   * 预览图片
   */
  previewImg(e) {
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: index,
      urls: this.data.localFilePaths
    })
  },

  /**
   * 提交用户输入的数据
   */
  async submit(e) {
    let formData = e.detail.value;
    // 数据校验
    if (!formData['description']) {
      wx.showToast({
        title: '请输入内容',
        icon: 'error',
        duration: 1000,
        mask:true
      })
      return false
    }

    // 上传文件
    let files = this.data.files
    for (let i in files) {
      await this.uploadFile(files[i].tempFilePath)
    }

    // 提交数据
    formData['openid'] = wx.getStorageSync('openid')
    formData['files'] = this.data.serverFilePaths
    wx.request({
      url: app.globalData.baseUrl+'/api/suggestions',
      method: 'POST',
      data: formData,
      success: (res) => {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          mask:true
        })
      }
    })
  }
})
