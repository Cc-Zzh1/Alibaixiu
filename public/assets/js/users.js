var userAry=[];
$('#userForm').on('submit',function(){
  var formData = $(this).serialize();
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    },
    error:function(err){
      alert('用户创建失败');
    }
  })
  return false;
})

$('#formBox').on('change','#avatar',function(){
 var formData = new FormData();
 formData.append('avatar',this.files[0]);

 $.ajax({
   type:'post',//get或post
   url:'/upload/',//请求的地址
   contentType:false,
   processData:false,
   data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
   success:function(result){//成功的回调函数
    $('#preview').attr('src',result[0].avatar);
     $('#hiddenAvatar').val(result[0].avatar);
   }
 })
})

$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    console.log(result);
    var html = template('userTpl',{users:result});
    $('#userList').html(html);
  }
})

$('#userList').on('click','.edit',function(){
  var id = $(this).attr('data-id');
  $.ajax({
    type:'get',//get或post
    url:'/users/'+id,//请求的地址
    data:{
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result);
      
      var html = template('editTpl',result);
      $('#formBox').html(html);
    }
  })
})

$('#formBox').on('submit','#editForm',function(){
  console.log($(this).serialize());
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  console.log(id);
  
  $.ajax({
    type:'put',//get或post
    url:'/users/'+id,//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  return false;
})

$('#userList').on('click','.delete',function(){
  if(confirm('您真的要删除用户吗？')){
    var id = $(this).attr('data-id');
    $.ajax({
      type:'delete',//get或post
      url:'/users/'+id,//请求的地址
      data:{
        _id:id
      },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      success:function(result){//成功的回调函数
        console.log(result);
        // var index = userAry.findIndex( item => item._id == id);
        // userAry.splice(index,1);
        // var html = template('tpl',{users:result});
        // $('#userList').html(html);
        location.reload();
      }
    })
  }
})

$('#selectAll').on('change',function(){
  var bool = $(this).prop('checked');
  $('#userList').find('.status').prop('checked',bool);
  if(bool == true){
    $('#deleteMany').show();
  }else{
    $('#deleteMany').hide();
  }
})

$('#userList').on('change','.status',function(){
  // console.log(111)
  if($('#userList').find('.status').length == $('#userList').find('.status').filter(':checked').length){
    $('#selectAll').prop('checked',true);
  }else{
    $('#selectAll').prop('checked',false);
  }
  // console.log($('#userList').find('.status'))
  if($('#userList').find('.status').filter(':checked').length >=2){
    $('#deleteMany').show();
  }else{
    $('#deleteMany').hide(); 
  }
})

$('#deleteMany').on('click',function(){
    if(confirm('确定要删除所有用户？')){
    var arr = []
    var selectAll = $('#userList').find('.status').filter(':checked');
    selectAll.each(function (index,element) {
      console.log($(element).attr('data-id'));
      arr.push($(element).attr('data-id'));
    })
$.ajax({
  type:'delete',//get或post
  url:'/users/' + arr.join('-'),//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    location.reload();
  }
})
  }
})