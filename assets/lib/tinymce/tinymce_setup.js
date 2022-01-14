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
       ',
    //imageupload 'codesample imageupload'
    //字体大小
    fontsize_formats: '10pt 12pt 14pt 18pt 24pt 36pt',
    //按tab不换行
    nonbreaking_force_tab: true,
    automatic_uploads: false,
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
    }
  })
}
