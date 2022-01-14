$(function () {
    var form = layui.form
    var params = {
        pagenum: 1,
        pagesize: 1,
        cate_id: '',
        state: ''
    }
    // 获取文章列表
    function initArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: params,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(Math.ceil(res.total))
            }
        })
    }

    // 获取文章分类列表
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                //重新渲染
                form.render()
            }
        })
    }

    // 定义渲染分页的方法
    function renderPage(count) {
        var laypage = layui.laypage;
        laypage.render({
            elem: 'page',     //分页容器id
            count: count,     //总数
            limit: params.pagesize,         //每页条数
            limits: [1, 2, 5, 10],
            curr: params.pagenum,  //当前页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //首次不执行
                if (!first) {
                    params.pagenum = obj.curr
                    params.pagesize = obj.limit
                    initArtList()
                }
            }
        });
    }

    initCate()
    initArtList()

    form.on('submit(ok)', function (data) {
        params.cate_id = data.field.cate_id
        params.state = data.field.state
        initArtList()
        return false;
    });

    $('tbody').on('click', '#btn-del', function () {
        var id = $(this).attr('data-id')
        var len = $('#btn-del').length
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章失败！')
                    }
                    layui.layer.msg('删除文章成功！')
                    if (len === 1) {
                        params.pagenum = params.pagenum === 1 ? 1 : params.pagenum - 1
                    }
                    initArtList()
                }
            })
            layer.close(index);
        });
    })

    $('tbody').on('click', '#btn-edit', function () {
        
        
    })

    //补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        var dt = new Date(date)

        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
})