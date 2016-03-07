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
 *5、添加动画效果
 *内部go()函数的递归调用（找好边界），通过setTimeout(fun,interval)实现递归
 *
 */

window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1; //标记当前图片的位置
    var animated = false;
    var interval = 3000;
    var timer;
    var len = 5;

    function animate(offset) {
        if (offset == 0) {
            return;
        }
        var newLeft = parseInt(list.style.left) + offset;
        var time = 300; // 位移时间
        var interval = 10; // 唯一间隔时间
        var speed = offset / (time / interval);
        // 优化当图片在动画过程中，点击没有效果
        animated = true;
        // 内部函数
        function go() {
            // 设置边界，什么时候做位移
            // 位移分两种向左移动和向右移动
            if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            } else {
                list.style.left = newLeft + 'px';
                // 无限滚动
                if (newLeft<(-600 * len)) {
                    list.style.left = '-600px';
                } else if (newLeft > -200) {
                    list.style.left = -600 * len + 'px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = buttons.length - 1; i >= 0; i--) {
            if (buttons[i].className.indexOf('on') != -1) {
                // console.log(buttons[i]);
                buttons[i].classList.remove('on');
                break;
            }
        };
        buttons[index - 1].classList.add('on');
    }

    function play() {
        timer = setTimeout(function() {
            next.onclick();
            play();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 5) {
            index = 1;
        } else {
            index += 1;
        }
        showButton();
        animate(-600);
    }

    prev.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 5;
        } else {
            index -= 1;
        }
        showButton();
        animate(600);
    }

    // 获取父节点，并为它添加一个click事件
    document.getElementById("buttons").addEventListener("click",function(e) {
      // 检查事件源e.targe是否为Li
      if(e.target && e.target.nodeName.toLowerCase() == "span") {
        // 真正的处理过程在这里
        if (animated) {
            return;
        }
        if (this.className == 'on') {
            return;
        }
        var myIndex = parseInt(e.target.getAttribute('index'));
        var offset = -600 * (myIndex - index);

        animate(offset);
        // 记得更新index
        index = myIndex;
        showButton();
      }
    });

    // for (var i = 0; i < buttons.length; i++) {
    //     // 代码优化
    //     // 1、点击当前函数时不应该做任何处理
    //     buttons[i].onclick = function() {
    //         if (animated) {
    //             return;
    //         }
    //         if (this.className == 'on') {
    //             return;
    //         }
    //         var myIndex = parseInt(this.getAttribute('index'));
    //         var offset = -600 * (myIndex - index);

    //         animate(offset);
    //         // 记得更新index
    //         index = myIndex;
    //         showButton();
    //     }
    // }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();

}
