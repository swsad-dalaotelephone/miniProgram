Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		current: 'minepage'
	},
	handleChange({
		detail
	}) {
		this.setData({
			current: detail.key
		});
	},

	onLoad: function (options) {

	}
})