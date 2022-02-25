$(function () {
    var form = layui.form
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
                initArticle()

            }
        })
    }

    //获取url参数
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }

    // 获取文章数据
    function initArticle() {
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章数据失败！')
                }
                //给表单赋值
                form.val("formArticle", res.data);
                // tinymce.activeEditor.setContent(res.data['content'])
                // 图片转换成路径
                var newImgURL = config.baseUrl + res.data['cover_img']
                $image
                    .cropper('destroy')      // 销毁旧的裁剪区域
                    .attr('src', newImgURL)  // 重新设置图片路径
                    .cropper(options)        // 重新初
            }
        })
    }

    // 修改文章
    function editArticle(params) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: params,
            // 提交Formdata数据必须添加下面两项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改文章失败！')
                }
                layui.layer.msg('修改文章成功！')
            }
        })
    }

    var id = getQueryVariable('id')

    initCate()
    // layui.use('layedit', function () {
    //     var layedit = layui.layedit;
    //     layedit.set({
    //         uploadImage: {
    //             url: '' //接口url
    //             , type: '' //默认post
    //         }
    //     });
    //     layedit.build('content'); //建立编辑器
    // });

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#coverFile').on('change', function (e) {
        // 获取选择文件
        var filelist = e.target.files
        console.log(filelist)
        if (filelist.length === 0) {
            return layer.msg('请选择图片！')
        }
        var file = filelist[0]
        // 图片转换成路径
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初
    })

    $('#btnChooseImg').on('click', function () {
        $('#coverFile').click()
    })

    //文章发布状态
    var art_status = '已发布'
    $('#btnSave').on('click', function () {
        art_status = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('Id', id)
        fd.append('state', art_status)
        art_status = '已发布'
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                editArticle(fd)
            })
    })
})