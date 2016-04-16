define(['jquery'], function($) {
  return{
    preloadImg:function(list,imgs) {
      var def = $.Deferred(),
      len = list.length;
      $(list).each(function(i,e) {
        var img = new Image();
        img.src = e;
        if(img.complete) {
            imgs[i] = img;
            len--;
            if(len == 0) {
              def.resolve();
            }
        }
        else {
          img.onload = (function(j) {
              return function() {
                  imgs[j] = img
                  len--;
                  if(len == 0) {
                      def.resolve();
                  }
              };
          })(i);
          img.onerror = function() {
            len--;
            console.log('fail to load image');
          };
        }
      });
      return def.promise();
    }
  }
});
