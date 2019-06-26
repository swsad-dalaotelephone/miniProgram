// pages/audit/audit.js
var app = getApp();
const http = require('../../utils/http.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		submitInfo: {
			acceptance_id: "",
			accepter: "",
			accepter_id: "",
			answer: [],
			feedback: "",
			status: 0,
			task_id: ""
		},
    questions: [{
      quest_type: 'choice',
      quest_title: '你认为中国将在多久之后夺得世界杯冠军？',
      id: 1,
      quest_option: [{
        content: '20年内',
        index: 'A'
      },
      {
        content: '50年内',
        index: 'B'
      },
      {
        content: '100年内',
        index: 'C'
      },
      {
        content: '200年内',
        index: 'D'
      },
      ]
      },
      {
        quest_type: 'text',
        quest_title: '说说你对中国足球的看法。',
        id: 2
      },
      {
        quest_type: 'choice',
        quest_title: '你认为***会连任到什么时候？',
        id: 3,
        quest_option: [{
          content: '2022',
          index: 'A'
        },
        {
          content: '2027',
          index: 'B'
        },
        {
          content: '2032',
          index: 'C'
        },
        {
          content: '2037',
          index: 'D'
        },
        {
          content: '2042',
          index: 'E'
        },
        {
          content: '2047',
          index: 'F'
        }
        ]
      },
    ],

    answers: [{
        type: 'm',
        option: [3]
      }, {
        type: 'f',
        text: '天亮了'
      },{
        type: 'm',
        option: [5]
      }
    ],
    type:'q',
		feedbackInput: ''
	},
  handleOptionChange: function (e) {
    var qindex = e.currentTarget.dataset.qindex;
    var answers = this.data.answers;

    let option_index = 0;
    let options = this.data.questions[qindex].quest_option;
    for (; option_index < options.length; option_index++) {
      if (options[option_index].content == e.detail.value) break;
    }

    answers[qindex] = {
      type: 'm',
      option: [option_index]
    };
    this.setData({
      answers: answers
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    if (typeof options.info != "undefined") {
      let transferInfo = JSON.parse(options.info)
      this.setData({
        submitInfo: transferInfo.submitInfo,
      })

      let task = transferInfo.taskInfo;
      let questions = [];
      if (task.type == 'd') {
        questions = [{
          quest_type: 'text',
          quest_title: '提交信息的邮箱是：',
          id: 1
        }]
      }
      else {
        questions = task.type == 'q' ? task.content.questions : task.content.participant_info;
        let new_id = 0;
        for (let i = 0; i < questions.length; i++) {
          questions[i].id = ++new_id;
          if (questions[i].quest_type == 'text') continue;
          let options = [];
          for (let j = 0; j < questions[i].quest_option.length; j++) {
            options.push({
              content: questions[i].quest_option[j],
              index: String.fromCharCode(j + 65)
            })
          }
          questions[i].quest_option = options;
        }
      }
      console.log('answer: ', submitInfo.answer);
      this.setData({
        questions: questions,
        answers: submitInfo.answer
      })
    }
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	inputFeedback: function (e) {
		this.setData({
			feedbackInput: e.detail.value
		})
	},

	tapNo: function (e) {

		let feedbackInput = this.data.feedbackInput
		if (feedbackInput.length > 0) {
			let url = '/task/' + this.data.submitInfo.task_id + '/acceptance/result'

			console.log("测试url", url)
			let result = 'accepter_id=' + this.data.submitInfo.accepter_id + '&result=false&feedback=' + this.data.feedbackInput
			http._put(url, result, 'application/x-www-form-urlencoded')
				.then(res => {
					wx.showToast({
						title: '审核成功',
						icon: 'none',
						duration: 1500,
						mask: false,
					})
					wx.navigateBack({
						delta: 1
					})
				})
				.catch(res => {
					wx.showToast({
						title: '审核出现错误，请联系客服',
						icon: 'none',
						duration: 1500,
						mask: false,
					})
				})
		} else {
			wx.showToast({
				title: '审核不通过需填写反馈',
				icon: 'none',
				duration: 1500,
				mask: false,
			});
		}
	},

	tapYes: function (e) {
		let url = '/task/' + this.data.submitInfo.task_id + '/acceptance/result'
		let result = 'accepter_id=' + this.data.submitInfo.accepter_id + '&result=true&feedback=' + this.data.feedbackInput
		http._put(url, result, 'application/x-www-form-urlencoded')
			.then(res => {
				wx.showToast({
					title: '审核成功',
					icon: 'none',
					duration: 1500,
					mask: false,
				})
				wx.navigateBack({
					delta: 1
				})
			})
			.catch(res => {
				wx.showToast({
					title: '审核出现错误，请联系客服',
					icon: 'none',
					duration: 1500,
					mask: false,
				})
			})
	}
})