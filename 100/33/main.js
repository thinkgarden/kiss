var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var coinId = 0;

var countdownDropAnimation = function(){
  var coin = $("<div class='countdown-bg__piece countdown-bg__piece-" + coinId + "'></div>");
  var hue = getRandomNumber(170,210);
  var saturation = getRandomNumber(65,85);
  var color = "hsl(" + hue + ", 75%," + saturation +"%)";
  var shadowColor = "hlsa(" + hue + ", 73%," + saturation +"%, 0.25)";
  console.log(shadowColor);
  coin.css({
    left: getRandomNumber(100,1000),
    backgroundColor:color,
    boxShadow: "0 20px 50px " + shadowColor
  });
  $(".countdown-bg").append(coin);
  $(".countdown-bg__piece-"+coinId).velocity({
    properties:{
      top:450,
      left: '50%',
      opacity: [0, 'easeInQuint'],
      scale: 0.6,
      rotateX: getRandomNumber(-5,5),
      rotateY: getRandomNumber(-45,45),
      rotateZ: getRandomNumber(-20,20),
      boxShadowY: 20,
      boxShadowBlur:20
    },
    options:{
      duration:8000,
      complete:function(){
        coin.remove()
      }
    }
  });
  coinId += 1;
}

setInterval(countdownDropAnimation,1500);
