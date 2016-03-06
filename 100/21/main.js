/**
 * 思路
 * 1、获取到所有的元素的dom索引
 * 2、箭头切换，点击箭头时图片
 * 为了便于操作，将图片移动的方法封装成一个函数animate(),他接受一个表示位移量的参数offset
 *
 * 3、通过index来标记当前图片，在每次点移动图片时更新index,
 * showButton()函数为index对应的图片添加on，Class属性
 *
 *4、按钮切换（关键是算出偏移量，比如当前图片是第一张，点击第五个按钮时图片应该切换到第五张，
 *对应的offset应该是5*width - list.style.left)
 *视频中通过for循环来添加事件，自己可以通过事件代理来实现。
 *
 *
 *
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
  var index = 1;//标记当前图片的位置

  function animate(offset){
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';
    // 无限滚动
    if(newLeft < -3000){
      list.style.left = -600 + 'px';
    } else if(newLeft > -600){
      list.style.left = -3000 + 'px';
    }
  }

  function showButton(){
    for (var i = buttons.length - 1; i >= 0; i--) {
      if(buttons[i].className.indexOf('on') != -1){
        console.log(buttons[i]);
        buttons[i].className = '';
        break;
      }
    };
    buttons[index -1].className = 'on';
  }

  next.onclick = function () {

    if (index == 5) {
      index = 1;
    } else{
      index += 1;
    }
    showButton();
    animate(-600);
  }

  prev.onclick = function () {
    if (index == 1) {
      index = 5;
    } else{
      index -= 1;
    }
    showButton();
    animate(600);
  }

  for (var i = 0; i < buttons.length; i++) {
    // 代码优化
    // 1、点击当前函数时不应该做任何处理
    if(this.className =='on'){
      return;
    }
    buttons[i].onclick = function () {
      var myIndex = parseInt(this.getAttribute('index'));
      var offset = -600 * (myIndex - index);

      animate(offset);
      // 记得更新index
      index = myIndex;
      showButton();
    }
  }

}
