function initEditor() {
  tinymce.init({
    //选择class为content的标签作为编辑器
    selector: 'textarea',
    //方向从左到右
    directionality: 'ltr',
    //语言选择中文
    language: 'zh_CN',
    //高度为400
    height: 300,
    statusbar: false,
    width: '100%',
    //工具栏上面的补丁按钮
    plugins: [
      'advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code insertdatetime nonbreaking',
      'save table contextmenu directionality template paste textcolor'
    ],
    //工具栏的补丁按钮
    toolbar:
      'insertfile undo redo | \
       styleselect | \
       bold italic | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | \
       image | \
       preview | \
       forecolor emoticons |\
       codesample fontsizeselect |\
       link',
    //imageupload 'codesample imageupload'
    //字体大小
    fontsize_formats: '10pt 12pt 14pt 18pt 24pt 36pt',
    //按tab不换行
    nonbreaking_force_tab: true,
    //images_upload_url: '',
    images_upload_handler: function (blobInfo, succFun, failFun) {
      console.log(blobInfo)
      // var xhr, formData;
      // var file = blobInfo.blob();//转化为易于理解的file对象
      // xhr = new XMLHttpRequest();
      // xhr.withCredentials = false;
      // xhr.open('POST', '/demo/upimg.php');
      // xhr.onload = function () {
      //   var json;
      //   if (xhr.status != 200) {
      //     failFun('HTTP Error: ' + xhr.status);
      //     return;
      //   }
      //   json = JSON.parse(xhr.responseText);
      //   if (!json || typeof json.location != 'string') {
      //     failFun('Invalid JSON: ' + xhr.responseText);
      //     return;
      //   }
      //   succFun(json.location);
      // };
      // formData = new FormData();
      // formData.append('file', file, file.name);//此处与源文档不一样
      // xhr.send(formData);
    },
    file_picker_callback: function (callback, value, meta) {
      console.log('1111111111')
      //文件分类
      var filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
      //后端接收上传文件的地址
      var upurl = '/demo/upfile.php';
      //为不同插件指定文件类型及后端地址
      switch (meta.filetype) {
        case 'image':
          filetype = '.jpg, .jpeg, .png, .gif';
          upurl = 'upimg.php';
          break;
        case 'media':
          filetype = '.mp3, .mp4';
          upurl = 'upfile.php';
          break;
        case 'file':
        default:
      }
      //模拟出一个input用于添加本地文件
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', filetype);
      input.click();
      input.onchange = function () {
        var file = this.files[0];

        var xhr, formData;
        console.log(file.name);
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', upurl);
        xhr.onload = function () {
          var json;
          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          callback(json.location);
        };
        formData = new FormData();
        formData.append('file', file, file.name);
        xhr.send(formData);

        //下方被注释掉的是官方的一个例子
        //放到下面给大家参考

        /*var reader = new FileReader();
        reader.onload = function () {
            // Note: Now we need to register the blob in TinyMCEs image blob
            // registry. In the next release this part hopefully won't be
            // necessary, as we are looking to handle it internally.
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            // call the callback and populate the Title field with the file name
            callback(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);*/
      };
    }
  })
}
