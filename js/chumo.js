//锁定屏幕滑动
var canTouch = 0;
document.addEventListener("touchmove", function (e) {
    if (canTouch == 0) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);

$(function () {
    var _isMobile = {
        Android: function () {
            return /Android/i.test(navigator.userAgent)
        },
        BlackBerry: function () {
            return /BlackBerry/i.test(navigator.userAgent)
        },
        iOS: function () {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent)
        },
        Windows: function () {
            return /IEMobile/i.test(navigator.userAgent)
        },
        any: function () {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Windows())
        }
    };
    var isAndroid = _isMobile.Android();
    if (isAndroid) {
        $("img.androidpic").addClass("imgclicknone");
    }

    //弹出层关闭事件
    $('.y-close,.fan_btn').on("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).parent().parent().css('display', 'none');
        $(".mask-layer").removeClass("active");
    });
    // 活动结束后执行act_end()
    function act_end() {
        $(".act_end").show();
        $(".mask-layer").addClass("active");
    }


})