$('#myfile').on('change',function(){
  var formData = new FormData();
  formData.append('logo',this.files[0]);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    contentType:false,
    processData:false,
    success:function(result){//成功的回调函数
      console.log(result);
      
      $('#preview').attr('src',result[0].logo)
      $('#hiddenImg').val(result[0].logo)
    }
  })
})

$('#settingForm').on('submit',function(){
  console.log($(this).serialize());
  $.ajax({
    type:'post',//get或post
    url:'/settings',//请求的地址
    data:$(this).serialize(),

    success:function(result){//成功的回调函数
      console.log(result)
      
    }
  })
  return false
})

$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)
    if(result){
      $('#hiddenImg').val(result.val);
      $('#preview').attr('src',result.logo);
      $('input[name="title"]').val(result.title);
      $('input[name="comment"]').prop('checked', result.comment);
      $('input[name="review"]').prop('checked', result.review);
    }
  }
})