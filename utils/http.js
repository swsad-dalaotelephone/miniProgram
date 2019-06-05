const baseUrl = 'https://api.baobaozhuan.cn';

const http = ({ url = '', param = {}, ...other } = {}) => {
  wx.showLoading({
    title: '请求中，请耐心等待..'
  });
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
        'cookie': 'baobaozhuan_cookie=MTU1OTc0NDc0NnxOd3dBTkVReVVWSlZVRmxRVGpkV1NsVlFTMVExUmxaRVJ6SlZXVXRSTlZsQlEwczNTVk5aUWtGSlYxaEpWRTlWUmxkV1YwcFZVVkU9fOVCHZvG4YuCNmQJFA1lSNU0e0VHrD2d2KhzIbO14FjS'
      },
      ...other,
      complete: (res) => {
        wx.hideLoading();
        console.log(timeStart)
        console.log(`耗时${Date.now() - timeStart}ms`);
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

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}
module.exports = {
  baseUrl,
  _get,
  _post,
  _put,
  _delete
}