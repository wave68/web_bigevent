$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , repwd: function (value) {
            var pwd = $('.layui-form [name=newPwd').val()
            if (pwd !== value) {
                return '确认密码与新密码不一致！'
            }
        }
    });

    form.on('submit(modify)', function (data) {
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: data.field,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                $('.layui-form')[0].reset()
            }
        })
        return false;
    });
})