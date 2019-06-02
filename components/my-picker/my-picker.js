// components/my-picker/my-picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    array: Array,
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.triggerEvent('change', e, {})
      // this.setData({
      //   index: e.detail.value
      // })
    }
  }
})
