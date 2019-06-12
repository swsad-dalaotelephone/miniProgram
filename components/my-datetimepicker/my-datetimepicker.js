// components/my-datetimepicker/my-datetimepicker.js


Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    currentDate: new Date().getTime()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleBottomPopup() {
      this.setData({
        show: !this.data.show
      })
    },
    onTransitionEnd() {
      console.log(`You can't see me 🌚`);
    },
    onConfirm(e) {
      this.setData({
        currentDate: e.detail
      });

      var date_str = new Date(this.data.currentDate).format("yyyy-MM-dd hh:mm:ss");
      console.log(date_str);
      this.triggerEvent('change', date_str, {})
      this.toggleBottomPopup()
    },
    onCancel() {
      console.log('datetimepicker cancelled');
      this.toggleBottomPopup()
    }
  }
})
