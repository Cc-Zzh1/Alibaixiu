$('#addCategory').on('submit',function(){
  console.log($(this).serialize());
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload();
    }
  })
  return false;
})

$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    console.log(result)
    var html = template('categoryTpl',{data:result});
    $('#categoryList').html(html);
  }
})

$('#categoryList').on('click','.edit',function(){
  var id = $(this).attr('data-id');
  console.log(id);
  
  $.ajax({
    type:'get',//get或post
    url:'/categories/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      // console.log(result)
      var html = template('editCategoryTpl',result);
      $('#formBox').html(html);
    }
  })
})


$('#formBox').on('submit','#editCategory',function(){
  // console.log($(this).serialize());
  var id = $(this).attr('data-id');
  $.ajax({
    type:'put',//get或post
    url:'/categories/'+id,//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false;
})

$('#categoryList').on('click','.edit',function(){
  var id = $(this).attr('data-id');
  $.ajax({
    type:'delete',//get或post
    url:'/categories/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload();
    }
  })
})

