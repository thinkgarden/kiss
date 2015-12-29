// 相册优化
// 1、使用canvas代替image标签
//
var total = 17;
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
var wImage = $('#large_img');
var domImage = wImage[0];

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

$('#large_container').tap(function(){
  $('#container').css({height:'auto','overflow':'auto'})
  $('#large_container').hide();
});
$('#large_container').mousedown(function(e){
    e.preventDefault();
});
var lock = false;
$('#large_container').swipeLeft(function () {
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
});

$('#large_container').swipeRight(function () {
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
})
