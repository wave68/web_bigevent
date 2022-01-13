$(function () {
    getUserInfo()
    //绑定退出事件
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    var name = user.usernick || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // user.user_pic = '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
    if (user.user_pic) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avater').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avater')
            .html(first)
            .show()
        $('.layui-nav-img').hide()
    }
}
