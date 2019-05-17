Component({
  externalClasses: ['i-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    show: {
      type: Boolean,
      value: false
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