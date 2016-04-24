require.config({
  baseUrl: 'js',
  paths: {
        'jquery': 'jquery-1.11.1.min'
    }
});

require(['jquery'], function($) {
  var index = 1;
  var last_index = 0;
  var showPic = function(a) {
      if (index >= a.length) {
          index = 0
      }
      a.eq(last_index).stop().animate({
          opacity: 0
      },
      500).end().eq(index).stop().animate({
          opacity: 1
      },
      500);
      last_index = index;
      index++
  }
  var a = $(".slides").find("li");
  var c = setInterval(function() {
      showPic(a)
  }, 5000);

});
