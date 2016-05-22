// 相册优化
// 1、使用canvas代替image标签
// 2、使用renderCvs将图片缓存在localstore中,解决图片左滑右滑中加载图片耗时的问题；
// 3、存在的问题,未对click事件进行区分；
//
(function () {
  var get = function (key) {
    return window.localStorage ? localStorage.getItem(key) : false;
  };
  var set = function (key, value) {
    return window.localStorage ? localStorage.setItem(key, value) : false;
  };
  window.SET = set;
  window.GET = get;
})();

var total = 11;
var zWin = $(window);
var resetContainer = function () {
  $('#container').css({height:'auto','overflow':'auto'})
  $('#large_container').hide();
}
var render = function () {
  var tmp = '',padding = 2,maxW = 700;
  var winWidth = zWin.width();
  if(winWidth >= maxW) winWidth = maxW;
  var picWidth = Math.floor((winWidth - padding * 3) / 4);
  var index = 0;
  for (var i = 1; i <= total; i++) {
    var p = padding;
    var imgsrc='images/'+i+'.jpg';
    if(i%4==1){
      p = 0;
    }
    tmp+='<li data-id="'+i+'" class="animated bounceIn" style="width:'+picWidth+'px;height:'+picWidth+'px;padding-left:'+p+'px;padding-top:'+padding+'px;"><canvas id="cvs_'+i+'"></canvas></li>';
    var imageObj = new Image();
    imageObj.index = i;
    imageObj.onload = function () {
      var cvs = $("#cvs_"+this.index)[0].getContext('2d');
      cvs.width = this.width;
      cvs.height = this.height;
      cvs.drawImage(this,0,0,this.width,this.height);
    }
    imageObj.src = imgsrc;
  };
  $("#container").html(tmp);
}
render();

$(window).resize(function () {
  console.log("container width change");
  resetContainer();
  render();
});


var cid,
    lock = false;
var wImage = $('#large_img'),
    largeContainer = $('#large_container');
var domImage = wImage[0];
var SWIPE_DISTANCE = 30,
    SWIPE_TIME = 500;
var point_start,point_end,time_start,time_end;
var startEvt, moveEvt, endEvt;

var renderCvs = function (imgId,w,h) {
  var imageCache = GET(imgId);
  if (imageCache) {
      wImage.attr('src',imageCache);
      return;
  }
  var img = new Image();
  img.id = imgId;
  img.crossorigin = "anonymous";
  img.onload = function (){
    var _this = this;
    domImage.src = imgId;
    try {
      var cvs = document.createElement('canvas');
      cvs.style.display = 'none';
      document.body.appendChild(cvs);
      var rcvs = cvs.getContext('2d');
      cvs.width = w;
      cvs.height = h;
      rcvs.drawImage(this, 0, 0, w, h);
      setTimeout(function () {
          var data = cvs.toDataURL();
          SET(_this.id, data);
          document.body.removeChild(cvs);
      }, 200);
    } catch (ex) {

    }
  }
  img.src = imgId;
}

var loadImg = function (id, callback) {
  $('#container').css({height:zWin.height(),'overflow':'hidden'});
  $("#large_container").css({width:zWin.width(),height:zWin.height()}).show();
  var imgsrc='images/'+id+'.large.jpg';
  var tep = 'images/'+id+'.small.jpg'
  var imageObj = new Image();
  imageObj.src = imgsrc;
  imageObj.onload = function () {
    var w = this.width;
    var h = this.height;
    var winWidth = zWin.width();
    var winHeight = zWin.height();
    var realW = winHeight * w / h;
    var realH = winWidth * h / w;
    var paddingLeft = parseInt((winWidth - realW) / 2);
    var paddingTop = parseInt((winHeight - realH) / 2);
    wImage.css('width','auto').css('height','auto');
    wImage.css('padding-left','0px').css('padding-top','0px');
    if(h/w > 1.2){
      wImage.attr('data-src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
      renderCvs(imgsrc,realW,winHeight);
    } else{
      wImage.attr('data-src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
      renderCvs(imgsrc,winWidth,realH);
    }

    callback && callback();
  }

}

$("#container").delegate('li', 'tap', function() {
  var _id = cid = $(this).attr('data-id');
  loadImg(_id);
});


largeContainer.tap(function(){
  $('#container').css({height:'auto','overflow':'auto'})
  largeContainer.hide();
  wImage.attr('src','');
});

largeContainer.mousedown(function(e){
    e.preventDefault();
});

var swipeLeft = function () {
  if(lock){
    return;
  }
  lock = true;
  cid++;
  if(cid > total){
    cid = total;
    lock = false;
  }else{
    loadImg(cid, function () {
      domImage.addEventListener('webkitAnimationEnd',function() {
        wImage.removeClass('animated bounceInRight');
        domImage.removeEventListener('webkitAnimationEnd');
        lock = false;
      }, false);
      wImage.addClass('animated bounceInRight');
    });
  }
}
var swipeRight = function () {
  if(lock){
    return;
  }
  lock = true;
  cid--;
  if(cid < 1){
    cid = 1;
    lock = false;
  }else{
    loadImg(cid, function () {
      domImage.addEventListener('webkitAnimationEnd',function() {
        wImage.removeClass('animated bounceInLeft');
        domImage.removeEventListener('webkitAnimationEnd');
        lock = false;
      }, false);
      wImage.addClass('animated bounceInLeft');
    });
  }
}

if("ontouchstart" in window){
  startEvt = "touchstart";
  moveEvt = "touchmove";
  endEvt = "touchend";
} else{
  startEvt = "mousedown";
  moveEvt = "mousemove";
  endEvt = "mouseup";
}
var getTouchPos = function (e) {
  var touches =  e.touches;
  if(touches &&  touches[0]){
    return {x : e.touches[0].clientX, y : e.touches[0].clientY };
  }
  return {x : e.clientX, y : e.clientY };
};
var getDist = function (p1, p2) {
  if(!p1 || !p2) return 0;
  return Math.sqrt((p1.x - p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
};
var getAngle = function (p1,p2) {
  var r = Math.atan2(p2.y-p1.y, p2.x - p1.x);
  var a = r * 180 / Math.PI;
  return a;
};

var getSwipeDirection = function (p2,p1) {
  var dx = p2.x - p1.x;
  var dy = -p2.y + p1.y;
  var angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if(angle < 45 && angle > -45) return 'right';
  if(angle >= 45 && angle < 135) return 'top';
  if(angle >= 135 || angle < -135) return 'left';
  if(angle >= -135 && angle <= -45) return 'bottom';
};

// 记录touchstart开始时间和位置
var startEvtHandler = function (e) {
  var touches =  e.touches;
  if(!touches ||  touches.length == 1){
    point_start = getTouchPos(e);
    time_start = Date.now();
  }
};

var moveEvtHandler = function (e) {
  point_end = getTouchPos(e);
  e.preventDefault();
};

var endEvtHandler = function  (e) {
  var time_end = Date.now();
  if(getDist(point_start,point_end) > SWIPE_DISTANCE &&
    time_start - time_end < SWIPE_TIME ) {
    var dir = getSwipeDirection(point_end, point_start);
    switch(dir){
      case 'right' :
        swipeRight();
        break;
      case 'left' :
        swipeLeft();
        break;
      case 'top' :
        swipeLeft();
        break;
      case 'bottom' :
        swipeRight();
        break;
    }
  }
};
largeDom = largeContainer[0];
largeDom.addEventListener('touchstart', startEvtHandler);
largeDom.addEventListener('touchmove', moveEvtHandler);
largeDom.addEventListener('touchend', endEvtHandler);




// largeContainer.swipeLeft(function () {
//   swipeLeft();
// });

// largeContainer.swipeRight(function () {
//   swipeRight();
// });

