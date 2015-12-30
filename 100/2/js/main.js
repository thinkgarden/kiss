// 相册优化
// 1、使用canvas代替image标签
//
var total = 11;
var zWin = $(window);

var resetContainer = function () {
  $('#container').css({height:'auto','overflow':'auto'})
  $('#large_container').hide();
}
var render = function () {
  var tmp = '',padding = 2,maxW = 800;
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
      cvs.drawImage(this,0,0);
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

var cid;
var wImage = $('#large_img'),largeContainer = $('#large_container');
var domImage = wImage[0];
var SWIPE_DISTANCE = 30;
var SWIPE_TIME = 500;
var point_start,point_end,time_start,time_end;
var startEvt, moveEvt, endEvt;
var lock = false;
var loadImg = function (id, callback) {
  $('#container').css({height:zWin.height(),'overflow':'hidden'});
  $("#large_container").css({width:zWin.width(),height:zWin.height()}).show();
  var imgsrc='images/'+id+'.large.jpg';
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
      wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
    } else{
      wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
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

