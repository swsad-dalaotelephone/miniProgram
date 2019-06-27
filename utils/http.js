// const baseUrl = 'https://api.baobaozhuan.cn';
const baseUrl = 'https://182.254.170.203';

const http = ({
	url = '',
	param = {},
	content_type = 'application/json',
	...other
} = {}) => {
	wx.showLoading({
		title: '请求中，请耐心等待..'
	});
	let timeStart = Date.now();
	// console.log("cookie", wx.getStorageSync("baobaozhuan_cookie"))
	return new Promise((resolve, reject) => {
		wx.request({
			url: getUrl(url),
			data: param,
			header: {
				'content-type': content_type, // 默认值 'application/json',另一种是'application/x-www-form-urlencoded'
				'cookie': wx.getStorageSync("baobaozhuan_cookie") || ''
				// 'cookie': 'baobaozhuan_cookie=MTU1OTc0NDc0NnxOd3dBTkVReVVWSlZVRmxRVGpkV1NsVlFTMVExUmxaRVJ6SlZXVXRSTlZsQlEwczNTVk5aUWtGSlYxaEpWRTlWUmxkV1YwcFZVVkU9fOVCHZvG4YuCNmQJFA1lSNU0e0VHrD2d2KhzIbO14FjS'
			},
			...other,
			complete: (res) => {
				// console.log(res)
				// 保存cookie
				if (res.header && res.header["Set-Cookie"]) {
					wx.setStorageSync("baobaozhuan_cookie", res.header["Set-Cookie"].split(';')[0])
				}
				wx.hideLoading();
				// console.log(timeStart)
				// console.log(`耗时${Date.now() - timeStart}ms`);
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data)
				} else {
					reject(res)
				}
			}
		})
	})
}

const getUrl = (url) => {
	if (url.indexOf('://') == -1) {
		url = baseUrl + url;
	}
	return url
}

// get方法
const _get = (url, param = {}) => {
	return http({
		url,
		param
	})
}

const _post = (url, param = {}, content_type = 'application/json') => {
	return http({
		url,
		param,
		content_type,
		method: 'post'
	})
}

const _put = (url, param = {}, content_type = 'application/json') => {
	return http({
		url,
		param,
		content_type,
		method: 'put'
	})
}


const _delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'delete'
	})
}
module.exports = {
	baseUrl,
	_get,
	_post,
	_put,
	_delete
}