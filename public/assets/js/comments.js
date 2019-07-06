var page = 1

render();

function changePage(currentpage) {
  page = currentpage
  render()
}

function render() {
  $.ajax({
    type: 'get', //get或post
    url: '/comments', //请求的地址
    data: {
      page:page
    }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) { //成功的回调函数
      var html = template('commentsTpl', result);
      $('#commentsList').html(html)
      var page = template('pageTpl', result);
      $('#pageList').html(page)
    }
  })
}

$('#commentsList').on('click', '.status', function () {
  var id = $(this).attr('data-id');
  var status = $(this).attr('data-status');

  $.ajax({
    type: 'put', //get或post
    url: '/comments/' + id, //请求的地址
    data: {
      state: status == 1 ? 0 : 1,
    }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) { //成功的回调函数
      location.reload()
    }
  })
})

$('#commentsList').on('click', '.delete', function () {
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'delete', //get或post
    url: '/comments/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) { //成功的回调函数
      location.reload()
    }
  })
})