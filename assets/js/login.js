$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , repwd: function (value) {
            var pwd = $('.reg-box [name=password').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });

    //监听注册表单的提交
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        let username = $('#form-reg [name=username]').val()
        let pwd = $('#form-reg [name=password]').val()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: username,
                password: pwd
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                $('#form-reg')[0].reset()
                layer.msg('注册成功,请登陆！')
                $('#link_login').click()
            }
        })
    })

    //监听登陆表单的提交
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        let username = $('#form-login [name=username]').val()
        let pwd = $('#form-login [name=password]').val()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: username,
                password: pwd
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功！')
                console.log(res.token)
                localStorage.setItem('token',res.token)
                location.href = './index.html'
            }
        })
    })
})