Component({
  externalClasses: ['i-class'],

  options: {
    multipleSlots: true
  },
  data: {
    statusList: ['未提交','待审核', '不达标', '已完成'],
    statusList1: ['进行中', '已结束', '已终止']
  },
  properties: {
    show: {
      type: String,
      value: '0'
    },
    full: {
      type: Boolean,
      value: false
    },
    thumb: {
      type: String,
      value: ''
    },
    item: {
      type: Object,
      value: {}
    }
  }
});