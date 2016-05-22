require.config({
  baseUrl: 'js',
  paths: {
        'jquery': 'jquery-1.11.1.min'
    }
});

require(['jquery','util'], function($,util) {
  var index = 1;
  var last_index = 0;
  var timer = null;
  var showPic = function(a) {
    console.log(a);
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

  var start = function(a,s){
    timer = setInterval(function() {
        showPic(a)
    }, s);
  }

  var reset = function(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }
  }

  var list = ["images/Slide1.jpg","images/Slide3.jpg","images/Slide4.jpg","images/Slide5.jpg"],
  imgs = [];
  $.when(util.preloadImg(list, imgs)).done(
      function() {
        var child='';
        $(imgs).each(function(i,item){
          child += '<li class="banner-img" style="background-image:url(' + imgs[i].src +')"></li>';
        });
        $(".home__slides ul").append(child);
        var slide = $(".home__slides").find("li");
        start(slide,3000);
      }
  );

});
