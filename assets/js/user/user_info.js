$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1-6个字符之间'
            }
        }
    });
    var userinfo = ''
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                //给表单赋值
                form.val("formUserInfo", res.data);
                userinfo = res.data
            }
        })
    }
    initUserInfo()

    form.on('submit(modify)', function (data) {
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: data.field,
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                //调用父页面的方法，重新渲染用户信息
                window.parent.getUserInfo()
            }
        })
        return false;
    });

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
})

