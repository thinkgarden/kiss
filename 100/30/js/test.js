// 通过函数，解决命名冲突的问题
// 存在的问题：代码可重用性差
var CheckObject = function(){
  return {
    checkName : function(){
      console.log("check name");
    },
    checkEmail : function() {
      console.log("check Email");
    }
  }
};


//通过构造函数创建对象
//所谓"构造函数"，其实就是一个普通函数，
//但是内部使用了this变量。
//对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。
var CheckObject1 = function(){
  this.checkName = function(){
    console.log("check name");
  }
  this.checkEmail = function() {
    console.log("check Email");
  }
};

// Prototype模式
//Javascript规定，每一个构造函数都有一个prototype属性，
//指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承
var CheckObject2 = function(){};
CheckObject2.prototype = {
  checkName : function(){
    console.log("check name");
  },
  checkEmail : function() {
    console.log("check Email");
  }
}



var o = new CheckObject();
console.log(o);
var o1 = new CheckObject1();
console.log(o1);

var o2 = new CheckObject2();
console.log(o2);

