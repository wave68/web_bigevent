$(function () {
    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    initArtCateList()
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    })

    var form = layui.form
    form.on('submit(add)', function (data) {
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: data.field,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('新增文章分类失败！')
                }
                layui.layer.msg('新增文章分类成功！')
                layui.layer.close(indexAdd)
                initArtCateList()
            }
        })
        return false;
    });

    var indexEdit = null
    //通过代理为动态元素添加点击事件
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败！')
                }
                form.val('form-edit', res.data)
            }
        })

    })
    $('tbody').on('click', '#btn-del', function () {
        var id = $(this).attr('data-id')
        layui.layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res)
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章分类失败！')
                    }
                    layui.layer.msg('删除文章分类成功！')
                    initArtCateList()
                }
            })
            layui.layer.close(index);
        });
    })

    form.on('submit(edit)', function (data) {
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: data.field,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新分类信息失败！')
                }
                layui.layer.msg('更新分类信息成功！')
                layui.layer.close(indexEdit)
                initArtCateList()
            }
        })
        return false;
    });
})