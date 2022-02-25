// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://127.0.0.1:3007' + options.url
  // options.url = 'http://www.liulongbin.top:3007' + options.url
  // options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  //统一为有权限接口设置请求headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }

    //统一挂载compelete函数
    options.complete = function (res) {
      if (res.responseJSON.status === 1 &&
        res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        if (top.location.href === location.href) {
          // location.href = '/login.html'
        }
        else {

        }
        top.location.href = '/login.html'
      }
    }
  }
})
