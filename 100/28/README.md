### requirejs 实践

#### requirejs具有如下优点：

防止js加载阻塞页面渲染

使用程序调用的方式加载js，防出现如下丑陋的场景

### 基本API
require会定义三个变量：define,require,requirejs，其中require === requirejs，一般使用require更简短

* define 从名字就可以看出这个api是用来定义一个模块

* require 加载依赖模块，并执行加载完后的回调函数

我们把require.config的配置加入到data-main后，就可以使每一个页面都使用这个配置，然后页面中就可以直接使用require来加载所有的短模块名
data-main还有一个重要的功能，当script标签指定data-main属性时，require会默认的将data-main指定的js为根路径，是什么意思呢？如上面的data-main="js/main"设定后，我们在使用require(['jquery'])后(不配置jquery的paths)，require会自动加载js/jquery.js这个文件，而不是jquery.js，相当于默认配置了：
