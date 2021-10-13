//当页面加载状态改变的时候执行这个方法. 
document.onreadystatechange = loading;
var iwidth = document.body.clientWidth;
var iheight = document.body.clientHeight;
var canvas = null; //初始化参数
var img = null;
var ctx = null;
var imageReady = false;
var zhentuStart = false;
var zhentuOk = false; //帧图是否加载完
var username;
var headimgurl;
var wecha_id;
// var fx;
var gameImgOk = false; //图片是否加载完
function loading() {
    if (document.readyState == "complete") { //当页面加载状态为完全结束时进入 
        //加载完成
        var loadAllTimer = setInterval(function () {
            if (gameImgOk) {
                // alert("全部加载完成");
                $('.load_page').hide();
                clearInterval(loadAllTimer);
                canTouch = 1;
            }
        }, 50)
    }

};

$(function () {
    $("input[name='form-input']").bind({
        focus: function () {
            if (this.value == this.defaultValue) {
                this.value = "";
            };
            
        // game.stage.disableVisibilityChange = true;
        },
        blur: function () {
            if (this.value == "") {
                this.value = this.defaultValue;
            }
            
        // game.stage.disableVisibilityChange = true;
        }
    });
    // 游戏规则按钮
    $(".btn_rule,.tipshand").on("click", function () {
        $(".rulePage").show();
        $(".mask-layer").addClass("active");
    })

    // 开始游戏按钮
    $(".btn_start").on("click", function () {
        var recId = GetCookie('recid' + ActivitiesID);
        if (recId != null & recId != undefined) {
            location.href = "index_b.html";
        }
        else {
            $(".reg_box").show();
            $(".mask-layer").addClass("active");
        }


    })
    // 关闭分享页面
    $(".sharePage").on("click", function () {
        $(this).hide();
    });
    $(".quxiao").on("click", function () {
        $(this).parent().hide();
        $(this).parent().siblings().show();
    })

    $("#btnCode").on("click", function () {
        getCode(false);
    });
    $(".code_captcha .pic_code").on("click", function () {
        getCaptcha($(".code_captcha"));
    });
    $(".btn_captcha .pic_code").on("click", function () {
        getCaptcha($(".btn_captcha"));
    });
    $(".code_captcha .tpreg_btn").on("click", function () {
        getCode(true);
    });
    $(".btn_captcha .tpreg_btn").on("click", function () {
        getGift(true);
    });
    $(".ystk_btn").on("click", function () {
        $(".ystkPage").show();
        $(".mask-layer").addClass("active");
    })

    $("#yesget").on("click", function () {
        getGift(false);
    });
});

//////////////////////////////coupon
var countdown = globalVar.countDownTime;
var _generate_code = $("#btnCode");
function settime() {
    if (countdown == 0) {
        _generate_code.attr("disabled", false);
        _generate_code.html("获取动态码");
        countdown = globalVar.countDownTime;
        return false;
    } else {
        _generate_code.attr("disabled", true);
        _generate_code.html("重新发送(" + countdown + "s)");
        countdown--;
    }
    setTimeout(function () {
        settime();
    }, 1000);
}
function getCode(isCaptcha) {
    if (countdown != globalVar.countDownTime) {
        return;
    }
    var $tel = $("#tel").val().trim();
    if ($tel == "") {
        showTip("请输入手机号码");
        return;
    }
    var reg = /^[1][3-9]\d{9}$/g;
    if (!reg.test($tel)) {
        showTip("请输入正确有效的手机号码");
        return;
    }
    var $smskey = $("#yzm").attr("smskey");
    if (undefined == $smskey) {
        $smskey = "";
    }
    var $captchaCode = "";
    var $captchaKey = "";
    if (isCaptcha) {
        $captchaCode = $(".code_captcha .picverify").val().trim();
        if ($captchaCode == "") {
            showTip("请输入图片验证码");
            return;
        }
        $captchaKey = $(".code_captcha .picverify").attr("ckey");
        if (undefined == $captchaKey || $captchaKey == "") {
            showTip("请先获取图片验证码");
            return;
        }
    }
}

function getCaptcha(obj) {
    var $tel = $("#tel").val().trim();
    if ($tel == "") {
        showTip("请输入手机号码");
        return;
    }
    var reg = /^[1][3-9]\d{9}$/g;
    if (!reg.test($tel)) {
        showTip("请输入正确有效的手机号码");
        return;
    }
}
var loadingGift = false;
function getGift(isCaptcha) {
    if (!$("input.agree_input_xy").prop("checked")) {
        showTip("请同意隐私政策后再提交");
        return;
    }
    var $tel = $("#tel").val().trim();
    if ($tel == "") {
        showTip("请输入手机号码");
        return;
    }
    var reg = /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)-?\d{5}(\d{3}|\*{3})$/;
    if (!reg.test($tel)) {
        showTip("请输入正确有效的手机号码");
        return;
    }
    var $smscode = $("#yzm").val().trim();
    if ($smscode == "") {
        showTip("请输入动态密码");
        return;
    }
    var $smskey = $("#yzm").attr("smskey");
    if ($smskey == undefined || $smskey == "") {
        showTip("请先获取动态密码");
        return;
    }
    var $captchaCode = "";
    var $captchaKey = "";
    if (isCaptcha) {
        $captchaCode = $(".btn_captcha .picverify").val().trim();
        if ($captchaCode == "") {
            showTip("请输入图片验证码");
            return;
        }
        $captchaKey = $(".btn_captcha .picverify").attr("ckey");
        if (undefined == $captchaKey || $captchaKey == "") {
            showTip("请先获取图片验证码");
            return;
        }
    }


    if (loadingGift == true) {
        return;
    }
    loadingGift = true;
    
}

// 游戏开始
function startGame() {
    $(".tipsPage").show();
    gamego();
}
function gamego() {
    $(".daoshu_num").show();
    $('.daoshu_num img').attr('src', 'images/daoshu3.png');
    setTimeout(function () {
        $('.daoshu_num img').attr('src', 'images/daoshu2.png');
        setTimeout(function () {
            $('.daoshu_num img').attr('src', 'images/daoshu1.png');
            setTimeout(function () {
                $('.daoshu_num img').attr('src', 'images/daoshugo.png');
                setTimeout(function () {
                    $('.daoshu_num img').attr('src', '');
                    $('.tipsPage').hide();
                    that.gamestart(gameconfig);
                    // game.stage.disableVisibilityChange = false;
                    // that.gameclear();
                }, 600);
            }, 600)
        }, 600);
    }, 600);
}

function showTip(txt, callback) {
    $(".tip-pop").popPanel({
        type: 2,
        desc: txt
    })
    if (callback != null) {
        window.setTimeout(callback, 1800)
    }
}


$(".get_btn").on('click', lingqu);
function lingqu() {
    $(".win_box").hide();
    $(".get_box").show();
}

// 微信红包按钮
$(".wx_check").on("click", function () {
    $(".wx_red_box").show();
    $(".mask-layer").addClass("active");
})
// 验证码按钮样式
$(document).on('input propertychange', '#LoginPhone', function (e) {
    if (e.type === "input" || e.orignalEvent.propertyName === "value") {
        if (this.value.length == 11) {
            $('.yzm').css("color", "#f4445f");
            // self.options.tel = true;
        } else {
            $('.yzm').css("color", "#e4d3b8");
            // self.options.tel = false;
        }
    }
})
// 适配ios输入框
$("input,select").blur(function () {
    $(window).scrollTop(0);
});
// 合成海报
var canvasImg = document.createElement("canvas");
var ctx = canvasImg.getContext('2d');
var devicePixelRatio = window.devicePixelRatio || 1,
    backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1,
    ratiobig = devicePixelRatio / backingStoreRatio;
var stageW = document.documentElement.clientWidth;

var m_num = "2"
var ewm = "./images/m-share.jpg"
$('.hc_btn').on("click", function () {
    $(".resultPage").hide();
    $(".section4").fadeIn();
    $("#compound").show();
    // gamenumboxPre = $(".numboxPre").html().trim();//打败排名百分数
    // compoundImge(m_num,ewm);
})
$(".fanhui").on("click", function () {
    $(".resultPage").show();
    $(".section4").fadeOut();
    $("#compound").hide();
})
function compoundImge(m_num, ewm) {
    var headsimg = ewm;

    if (canvasImg.getContext) {
        var bgSizeW = $("#compound").width();
        var bgSizeH = $("#compound").height();

        var headsimgX = 496 * (stageW / 750);
        var headsimgY = 735 * (stageW / 750);
        var headsimgW = 115 * (stageW / 750);

        var gamenumboxPreX = 320 * (stageW / 750);
        var gamenumboxPreY = 200 * (stageW / 750);

        var fontsize = 6 * (stageW / 750);
        var bfbhanzi = canvasImg.getContext("2d");
        canvasImg.width = bgSizeW * ratiobig;
        canvasImg.height = bgSizeH * ratiobig;
        canvasImg.style.width = bgSizeW + 'px';
        canvasImg.style.height = bgSizeW + 'px';

        var bgImg = new Image();//背景
        bgImg.crossOrigin = "anonymous";
        bgImg.src = "./images/data-pic01.jpg"; //
        var bimgW = 650 * (stageW / 750);
        var bimgH = 900 * (stageW / 750);

        bgImg.addEventListener("load", function () {
            ctx.drawImage(bgImg, 0, 0, bimgW * ratiobig, bimgH * ratiobig); //
            var qrImg = new Image();//二维码
            qrImg.crossOrigin = "anonymous";
            qrImg.src = headsimg; //

            qrImg.addEventListener("load", function () {
                ctx.drawImage(qrImg, headsimgX * ratiobig, headsimgY * ratiobig, headsimgW * ratiobig, headsimgW * ratiobig);

                var wImg = new Image();//中奖
                wImg.crossOrigin = "anonymous";
                wImg.src = "./images/w_tit.png"; //
                var wimgW = 572 * (stageW / 750);
                var wimgH = 74 * (stageW / 750);
                var wimgX = 40 * (stageW / 750);
                var wimgY = 60 * (stageW / 750);

                wImg.addEventListener("load", function () {
                    var lImg = new Image();//未中奖
                    lImg.crossOrigin = "anonymous";
                    lImg.src = "./images/l_con.png"; //
                    var limgW = 612 * (stageW / 750);
                    var limgH = 182 * (stageW / 750);
                    var limgX = 10 * (stageW / 750);
                    var limgY = 60 * (stageW / 750);

                    lImg.addEventListener("load", function () {

                        bfbhanzi.font = 'bold ' + fontsize * ratiobig + 'em 黑体';
                        bfbhanzi.textAlign = 'center';
                        bfbhanzi.fillStyle = '#fe01fa';
                        bfbhanzi.textBaseline = 'middle';
                        if (m_num !== "谢谢参与" && m_num != "" && m_num != undefined && m_num != null) {
                            ctx.drawImage(wImg, wimgX * ratiobig, wimgY * ratiobig, wimgW * ratiobig, wimgH * ratiobig);
                            bfbhanzi.fillText( m_num + "元现金红包", gamenumboxPreX * ratiobig, gamenumboxPreY * ratiobig);
                        } else {
                            ctx.drawImage(lImg, limgX * ratiobig, limgY * ratiobig, limgW * ratiobig, limgH * ratiobig);
                        }
                        document.querySelector(".cimg").src = canvasImg.toDataURL("image/jpeg");
                        $(".bottomimgbg").hide();
                    }, false);
                }, false);
            }, false);
        }, false);
    };
}
