!function() {
    function a() {
        return b(location.search, "?", "&")
    }
    function b(a, b, c) {
        var f, g, h, d = a.replace(b, "").split(c), e = {};
        for (f = 0, g = d.length; g > f; f++)
            h = d[f].split("="), e[h[0]] = h[1];
        return e
    }
    window.shaketv || (window.shaketv = {}), shaketv.wxShare = function(b, c, d, e) {
        function f() {
            var f, g;
            return {
                img_url: b,
                link: 'http://dl.game.35go.net/weixin/yxkw/cj/',
                desc: d,
                title: c
            }
        }
        var g = function() {
            WeixinJSBridge.on("menu:share:appmessage", function() {
                WeixinJSBridge.invoke("sendAppMessage", f(), function() {
                    window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5NzE3NzA1Mg==&mid=206448795&idx=1&sn=7c0b18c76cfc5da017f41f607c4dc2fc#rd"
                })
            }), WeixinJSBridge.on("menu:share:timeline", function() {
                WeixinJSBridge.invoke("shareTimeline", f(), function() {
                    window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5NzE3NzA1Mg==&mid=206448795&idx=1&sn=7c0b18c76cfc5da017f41f607c4dc2fc#rd"
                })
            }), WeixinJSBridge.on("menu:share:weibo", function() {
                var a = f();
                a = {
                    url: a.link,
                    content: "【" + a.title + "】" + " " + a.desc + " " + a.link,
                    img_url: a.img_url
                }, WeixinJSBridge.invoke("shareWeibo", a, function() {
                    window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5NzE3NzA1Mg==&mid=206448795&idx=1&sn=7c0b18c76cfc5da017f41f607c4dc2fc#rd"
                })
            }), WeixinJSBridge.on("menu:share:facebook", f(), function() {
                window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5NzE3NzA1Mg==&mid=206448795&idx=1&sn=7c0b18c76cfc5da017f41f607c4dc2fc#rd"
            })
        };
        window.WeixinJSBridge ? g() : document.addEventListener("WeixinJSBridgeReady", g, !1)
    }
}();

