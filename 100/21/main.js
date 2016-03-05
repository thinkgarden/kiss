/**
 * 思路
 * 1、获取到所有的元素的dom索引
 * 2、箭头切换，点击箭头时图片
 * 为了便于操作，将图片移动的方法封装成一个函数animate(),他接受一个表示位移量的参数offset
 *
 * 3、
 *
 *
 *
 */

window.onload = function () {
  var container = document.getElementById('container');
  var list = document.getElementById('list');
  var buttons = document.getElementById('buttons').getElementsByTagName('span');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');

  function animate(offset){
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';
    if(newLeft < -3000){
      list.style.left = -600 + 'px';
    } else if(newLeft > -600){
      list.style.left = -3000 + 'px';
    }


  }

  next.onclick = function () {
    animate(-600);
  }

  prev.onclick = function () {
    animate(600);
  }

}
