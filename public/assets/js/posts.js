var page =1
render();

function changePage(currentpage) {
  page = currentpage
  render()
  }
//设置时间格式 方法1
function dateFormat(date) {
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//设置时间格式 方法2
// template.defaults.imports.dateFormat = function(date) {
// 			var year = date.substr(0, 4);
// 			var month = date.substr(5, 2);
// 			var day = date.substr(8, 2);
// 			var hour = date.substr(8, 2);
// 			var minute = date.substr(10, 2);
// 			var seconds = date.substr(12, 2);

// 			return year + '-' + month + '-' + day;
// }

function render() {
  $.ajax({
    type: 'get', //get或post
    url: '/posts', //请求的地址
    data: {
      page:page
    }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) { //成功的回调函数
      // console.log(result);
      var html = template('articleTpl', {
        data: result.records
      })
      $('#articleList').html(html)
      var page = template('pageTpl', result)
      $('#pageList').html(page)
    }
  })
}

$.ajax({
  type: 'get',
  url: '/categories',
  success: function(response) {
    // console.log(response);
    var html = template('categoryTpl', { data: response });
    $('#categoryList').html(html);
  }
})

$('#filterForm').on('submit',function(){
  // console.log($(this).serialize().split('state=')[1]);
  // console.log($(this).serialize());
  var state = $(this).serialize().split('state=')[1]
  if( state == 2 ){
    location.reload();
    return false
  }else{
  $.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      var html = template('articleTpl', {
        data: result.records
      })
      $('#articleList').html(html)
      var page = template('pageTpl', result)
      $('#pageList').html(page)
    }
  })
  return false
}

})

$('#articleList').on('click','.delete',function() {
   if(confirm('确定要删除吗？')){
    var id = $(this).attr('data-id')
    $.ajax({
      type:'delete',//get或post
      url:'/posts/'+id,//请求的地址
      data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      success:function(result){//成功的回调函数
        location.reload();
      }
    })
   }
})