$.ajax({
  type: 'get',
  url: '/categories',
  success: function(response) {
    // console.log(response);
    var html = template('categoryTpl', { data: response });
    $('#category').html(html);
  }
})

$('#feature').on('change', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post', //get或post
    url: '/upload', //请求的地址
    contentType: false,
    processData: false,
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) { //成功的回调函数
      console.log(result)
      $('.thumbnail').attr('src', result[0].avatar).show();
      $('#thumbnail').val(result[0].avatar);
    }
  })
})

$('#addForm').on('submit', function () {
  var formData = $(this).serialize();
  console.log(formData);
 
  $.ajax({
    type: 'post', //get或post
    url: '/posts', //请求的地址
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) { //成功的回调函数
      location.href = '/admin/posts.html'
    }
  })
  return false;
})

function  getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&');
  for (var i =0 ; i<paramsAry.length;i++){
    var tmp = paramsAry[i].split('=');
    if(tmp[0] == name){
      return tmp[1];
    }
  }
  return -1;
}


var id = getUrlParams('id')
if(id != -1){
  $.ajax({
    type:'get',//get或post
    url:'/posts/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      $.ajax({
        type: 'get', //get或post
        url: '/categories', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function (response) { //成功的回调函数
          result.categories = response;
          var html = template('editTpl', result);
          $('#parentBox').html(html);
        }
      })
    }
  })
}

$('#parentBox').on('submit','#editForm',function(){
  var id = $(this).attr('data-id');
  console.log(id);
  
  $.ajax({
    type:'put',//get或post
    url:'/posts/'+id,//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      location.href='posts.html'
    }
  })
return false;
})
