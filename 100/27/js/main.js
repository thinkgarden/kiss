require.config({
  baseUrl: 'js',
  paths: {
        'jquery': 'jquery-1.11.1.min'
    }
});

require(['jquery','util'], function($,util) {
  var index = 1;
  var last_index = 0;
  var showPic = function(a) {
      if (index >= a.length) {
          index = 0
      }
      a.eq(last_index).stop().animate({
          opacity: 0
      },
      800).end().eq(index).stop().animate({
          opacity: 1
      },
      800);
      last_index = index;
      index++
  }
  var a = $(".home__slides").find("li");

  var c = setInterval(function() {
      showPic(a)
  }, 4000);

  var list = ["images/Slide1.jpg","images/Slide2.jpg","images/Slide3.jpg","images/Slide4.jpg","images/Slide5.jpg"],    //此处省略一万个字符
  imgs = [];
  $.when(util.preloadImg(list, imgs)).done(
      function() {
         a.each(function(i,item){
            var index = i+1;
            var url ="url('images/Slide"+index+".jpg')";
            item.style.backgroundImage = url;
         });
         alert($(documet.body).html());
      }
  );

});
