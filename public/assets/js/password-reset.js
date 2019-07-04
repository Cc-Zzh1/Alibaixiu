//当修改密码表单发生提交行为的时候
$('#editForm').on('submit', function() {
  var formData = $(this).serialize();
  console.log(formData)
  //调用接口 实现密码修改功能
  $.ajax({
    url: '/users/password',
    type: 'put',
    data: formData,
    success: function(result) {
      console.log(result);
      
      location.href = '/admin/login.html';
    }
  })
  //阻止表单默认提交的行为
  return false;
})

$.ajax({
  type:'get',//get或post
  url:'',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    console.log(result)
  }
})