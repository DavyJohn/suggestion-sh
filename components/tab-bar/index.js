// components/tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current: String
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 根据key值跳转到相应的标签页
     */
    handleChange ({ detail }) {
      wx.redirectTo({
        url: '/pages/' + detail.key + '/' + detail.key
      })
    }
  }
})
