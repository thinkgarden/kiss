$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  $("header .expanding-text").css({
    'line-height': 1.25 + (scroll/400),
    'opacity': 1 - (scroll/500),
    "-webkit-filter": "blur(" + (scroll/200) + "px)",
    filter: "blur(" + (scroll/200) + "px)"

  });
});
