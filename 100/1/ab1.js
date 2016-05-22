var oDl = document.getElementsByTagName("dl"), lDl = oDl.length,
    oDt = document.getElementsByTagName("dt"), lDt = oDt.length;

document.getElementById("btnWidth").onclick = function() {
  for (var i = 0; i < lDl; i += 1) {
    oDl[i].style.width = "470px";
  }
};
document.getElementById("btnRelative").onclick = function() {
  for (var i = 0; i < lDt; i += 1) {
    oDt[i].style.position = "static";
  }
};


$("#btnLeftSide").bind("click", function() {
    $("#leftCon").append('<img src="http://image.zhangxinxu.com/image/study/s/s128/mm2.jpg" />');
});
$("#btnRightSide").bind("click", function() {
    $("#rightCon").append('<img src="http://image.zhangxinxu.com/image/study/s/s128/mm5.jpg" />');
});
