/**
 * Created by zyl on 2019/5/31.
 */
var userObj = {};
var ActivitiesID = 201905314;
var url = "";
$(document).ready(function () {
    //$('.youhui_box').show();
    //$('.money_box').hide();
    //$(".resultPage,.win_box").show();
    //$("#game").hide();


    //$(".contentSlide").hide(); //隐藏轮播
    //$(".rulePage,.indexPage").hide();
    //$(".reg_box").hide();
    //$(".mask-layer").removeClass("active");
    //startGame();


    $('#dengluing').bind("click", dengluBynamephone);

    url = BitautoMarketSk.webapiCommonurl + "Api/Handler1.ashx";
    userObj.ActivitiesID = 201905314;
    userObj.checkBtn = false;
    userObj.ckbtn = false;
    userObj.url = BitautoMarketSk.webapiCommonurl + "Api/Handler1.ashx";
    userObj.txtArr = [$.trim($('#LoginName').val()), $.trim($('#LoginPhone').val()), $.trim($('#sex option:selected').text()), $.trim($('#prov option:selected').text()), $.trim($('#city option:selected').text()), $.trim($('#dealer option:selected').text()), $.trim($('#chexing option:selected').text()), $.trim($('#buytime option:selected').text())];
    compatibilityProcess();
    new BitautoMarketSk.PageLoad({
        Type: "103",
        Actid: userObj.ActivitiesID,
        sendCodeButton: "getcode",
        sendCodePhoneDiv: "LoginPhone"
    });
    selProv();
    $('#prov').change(function () {
        selCity($(this).find('option:selected').text());
    });
    $('#city').change(function () {
        selDealer($(this).find('option:selected').text());
    });
    $('#denging').on("click", subForm);
});





function HitteMainFunk(sprite, el) {
    $(el).unbind();
    if (limiting()) {
        var recId = GetCookie('recid' + ActivitiesID);
        if (recId == null || recId == undefined) {
            var anim = sprite.animations.add('hitted', [0, 2]);
            sprite.play('hitted', 100, false);
        }
        else {
            var _iw = GetCookie('iw' + recId);
            if (_iw != "" && _iw != undefined && _iw != null) {
                var anim = sprite.animations.add('hitted', [0, 2]);
                sprite.play('hitted', 100, false);
            }
            else {
                ActivitiesChouJiang(sprite);
            }
        }

    }
    else {
        var anim = sprite.animations.add('hitted', [0, 2]);//1奖；2空
        sprite.play('hitted', 100, false);
    }
}


function ActivitiesChouJiang(sprite) {

    var hitnum = 2;
    var recId = GetCookie('recid' + ActivitiesID);
    var phone = GetCookie('phone' + ActivitiesID);

    if (recId != "" && recId != undefined && recId != null) {

        var gameUrl = BitautoMarketSk.webapiCommonurl + "Api/ChouJiang.ashx";
        var body = "Action=choujiang&ActivitiesID=" + ActivitiesID + "&LoginUserID=" + recId + "&fc=" + phone;
        // $('.click_btn').unbind();
        $.getJSON(gameUrl + "?callback=?", body, function (data) {
            var item = data.result;
            var code = data.code;
            var prizename = data.message;
            switch (parseInt(item)) {
                case 0:
                    hitnum = 2;
                    break;
                case -3:
                    // $('.result').find("p").html('此活动已结束');
                    hitnum = 2;
                    break;
                case -4:
                    // AlertTips("您已经参加过抽奖，勿重复参加！");
                    hitnum = 2;
                    break;
                case 1837://现金红包2元
                    hitnum = 1;
                    DefiningVariables("1", code, prizename, "", recId);
                    break;
                case 1838://现金红包5元
                    hitnum = 1;
                    DefiningVariables("1", code, prizename, "", recId);
                    break;
                case 1839://现金红包18元
                    hitnum = 1;
                    DefiningVariables("1", code, prizename, "", recId);
                    break;
                case 1840://现金红包50元
                    hitnum = 1;
                    DefiningVariables("1", code, prizename, "", recId);

                    break;
                case 1841://现金红包66元
                    hitnum = 1;
                    DefiningVariables("1", code, prizename, "", recId);
                    break;
                case 1842://100元通用优惠券
                    hitnum = 1;
                    DefiningVariables("0", code, prizename, "100", recId);
                    break;
                case 1843://200元通用优惠券
                    hitnum = 1;
                    DefiningVariables("0", code, prizename, "200", recId);
                    break;
                case 1844://500元通用优惠券
                    hitnum = 1;
                    DefiningVariables("0", code, prizename, "500", recId);
                    break;
                default:
                    hitnum = 2;
                    // AlertTips("网络繁忙");
                    break;
            }
            var anim = sprite.animations.add('hitted', [0, hitnum]);
            sprite.play('hitted', 100, false);
            //$('#denging').unbind().bind("touchend", submitLogin);
        });

    }
}

var _public_ismonneydiv = "0";
var _public_code = "";
var _public_prizename = "";
var _public_q_num = "";

function DefiningVariables(ismonneydiv, code, prizename, q_num, recId) {
    SetCookie('iw' + recId, "1");
    _public_ismonneydiv = ismonneydiv;
    _public_code = code;
    _public_prizename = prizename;
    _public_q_num = q_num;

}

function popPrizeDiv() {
    var recId = GetCookie('recid' + ActivitiesID);
    SetCookie('presult' + recId, escapeStr(_public_ismonneydiv + "-" + _public_code + "-" + _public_prizename + "-" + _public_q_num));
    
    compoundImge(_public_prizename,ewm);

    if (_public_ismonneydiv == "1" && _public_prizename != "" && _public_code != "") {
        $('.money_box').find("h3").html(_public_prizename + "  兑换码为");
        $('.dhm_txt').html(_public_code);
        $('.youhui_box').hide();
        $('.money_box').show();
        $('.canyu_box').hide();
        $(".resultPage,.win_box").show();
        $("#game").hide();
    }
    else if (_public_ismonneydiv == "0" && _public_q_num != "") {
        $('.q_num').html(_public_q_num);
        $('.youhui_box').show();
        $('.money_box').hide();
        $('.canyu_box').hide();
        $(".resultPage,.win_box").show();
        $("#game").hide();
    }
    else {
        // $('.youhui_box').html('<h6><span></span>很遗憾您未能抽中<span></span></h6><h3><span class="q_num" style="font-size:0.8rem;position:relative;top:0.3rem; ">谢谢参与</span></h3>  <a href="javascript:;" class="share_btn" onclick="stm_clicki(' + "'send'" + "'event', '分享', 'Click', '谢谢参与', " + '1);"><img src="images/share_btn.png" alt=""></a>');

        $('.youhui_box').hide();
        $('.money_box').hide();
        $('.canyu_box').show();
        $(".resultPage,.win_box").show();
        $("#game").hide();
    }
}



function subForm() {
   // userObj.txtArr = [$.trim($('#LoginName').val()), $.trim($('#LoginPhone').val()), $.trim($('#sex option:selected').text()), $.trim($('#prov option:selected').text()), $.trim($('#city option:selected').text()), $.trim($('#dealer option:selected').text()), $.trim($('#chexing option:selected').text()), $.trim($('#buytime option:selected').text())];

    userObj.name = checlUserInfo($('#LoginName').val(), 0);
    userObj.phone = checlUserInfo($('#LoginPhone').val(), 1);
    userObj.sex = checlUserInfo($('#sex option:selected').text(), 2);
    // userObj.sex = $('input[name="sex"]:checked').val();
    userObj.prov = checlUserInfo($('#prov option:selected').text(), 3);
    userObj.city = checlUserInfo($('#city option:selected').text(), 4);
    userObj.dealer = checlUserInfo($('#dealer option:selected').text(), 5);
    userObj.chexing = checlUserInfo($('#chexing option:selected').text(), 6);
    userObj.buytime = checlUserInfo($('#buytime option:selected').text(), 7);
    userObj.code = $.trim($('#code').val());
    userObj.provId = $('#prov option:selected').val();
    userObj.cityId = $('#city option:selected').val();
    userObj.dealerId = $('#dealer option:selected').val();
    userObj.chexingId = $('#chexing option:selected').val();
    userObj.ycid = $('#chexing option:selected').attr('ycid');
    userObj.ckid = "";
    userObj.brandId = "156";
    userObj.isPostYiPai = "0"; //车易通对接状态\1表示对接，0表示不对接
    if (checkFrom(userObj)) {
        for (var u in userObj) {
            userObj[u] = userObj[u] == undefined ? "" : userObj[u];
        }
        dengingLogin(userObj);
    }
}
/*
 注册表单验证
 */
function checkFrom(userObj) {
    if (exist("LoginName")) {
        if (userObj.name == "") {
            alert('请填写姓名');
            return false;
        } else {
            if (GetStringRealLength(userObj.name) > 20) {
                alert('请输入正确的姓名');
                return false;
            }
        }
    }
    if (exist("sex")) {
        if (userObj.sex == "") {
            alert('请选择性别');
            return false;
        }
    }
    if (exist("LoginPhone")) {
        if (userObj.phone == "") {
            alert('请填写手机号');
            return false;
        } else {
            if (!BitautoMarketSk.PageLoad.prototype.isMobile(userObj.phone)) {
                alert('请填写正确的手机号，如:13012345678');
                return false;
            }
        }
    }

    if (exist("code")) {
        if (userObj.code == "" || userObj.code == "验证码") {
            alert('请输入验证码');
            return false;
        }
    }
    if (exist("chexing")) {
        if (userObj.chexing == "") {
            alert('请选择意向车型');
            return false;
        }
    }
    if (exist("prov")) {
        if (userObj.prov == "") {
            alert('请选择省份');
            return false;
        }
    }
    if (exist("city")) {
        if (userObj.city == "") {
            alert('请选择城市');
            return false;
        }
    }
    if (exist("dealer")) {
        if (userObj.dealer == "") {
            alert('请选择经销商');
            return false;
        }
    }
    if (exist("buytime")) {
        if (userObj.buytime == "") {
            alert('请选择预计购车时间');
            return false;
        }
    }
    if (!$('.agree_input_xy').is(':checked')) {
        alert('请确认  我已阅读并同意《隐私政策》里的各项内容');
        return false;
    }
    return true;
}
/*
 注册表单提交
 */
function dengingLogin(userObj) {
    var YOrderTypeID = 1; //订单类型
    var YDealerID = ""; //经销商ID 销售提供
    if (userObj.isPostYiPai == "1") {
        YDealerID = userObj.dealerId
    }
    var YLocationID = ""; //地区id
    var YUserIP = ""; //用户IP
    var YCarSerialId = userObj.ycid; //车型ID 销售提供
    var YCarId = userObj.ckid; //车款ID 销售提供
    //消息推送参数开始
    var msgUserId = 0; //易车会员ID
    var msgAddress = 0; //地址
    var msgbsid = userObj.brandId; //车型品牌
    var msgcsid = userObj.ycid; //车型
    try {
        if (Bitauto.Login.result.isLogined == true) {
            msgUserId = Bitauto.Login.result.userId;
        }
    } catch (err) {

    }

    try {
        YLocationID = bit_locationInfo.cityId
    } catch (e) {

    }
    try {
        YUserIP = bit_locationInfo.IP;
    } catch (e1) {

    }
    var xcweblog = "";
    try {
        xcweblog = XCWEBLOG_ID;
    } catch (err1) { }

    var filedgstr = "";
    var marketfromad = request("marketfromad");
    try {
        var fgcx = request("fgcx");
        if (fgcx == "yes") {
            if (filedgstr == "") {
                filedgstr = "6";
            } else {
                filedgstr += "(6)";
            }
        }
    } catch (err2) {

    }

    if (marketfromad == "") {
        filedgstr += marketfromad;
    } else {
        filedgstr += "(" + marketfromad + ")";
    }
    var SMARTCODE = request("SMARTCODE");
    var cityName = "";
    try {
        cityName = bit_locationInfo.cityName;
    } catch (e) { }
    // if (!(userObj.dealerId)) {
    //     getPCDid(userObj.dealer);
    // }
    var str = escapeStr(userObj.code + ',' + userObj.name + ',' + userObj.phone + ',' + userObj.prov + ',' + userObj.city + ',' + userObj.dealer + ',' + filedgstr + ',' + userObj.sex + ',' + userObj.chexing + ',' + userObj.chexingId + ',' + userObj.buytime + ',' + ',' + ',,,' + xcweblog + ',' + userObj.provId + ',' + userObj.cityId + ',' + userObj.dealerId);
    // var str = escapeStr(userObj.code + ',' + userObj.name + ',' + userObj.phone + ',' + userObj.prov + ',' + userObj.city + ',' + userObj.dealer + ',' + filedgstr + ',' + userObj.sex + ',' + userObj.chexing + ',' + ',' + userObj.buytime + ','  + ',' + ',,,' + xcweblog + ',' + userObj.provId + ',' + userObj.cityId + ',' + userObj.dealerId);
    var body = "isDock=1&isonlyphone=3&istdata=1&SMARTCODE=" + escapeStr(SMARTCODE) + "&strC=" + escapeStr(cityName); //常规参数
    body += "&isPostYiPai=" + userObj.isPostYiPai + "&YOrderTypeID=" + YOrderTypeID + "&YDealerID=" + YDealerID + "&YLocationID=" + YLocationID + "&YUserIP=" + YUserIP + "&YCarSerialId=" + YCarSerialId + "&YCarId=" + YCarId + ""; //易湃订单参数
    //消息推送传参开始
    body += "&isPushMsg=1&msgUserId=" + msgUserId + "&msgIP=" + YUserIP + "&msgAddress=" + msgAddress + "&msgCityId=" + YLocationID + "&msgbsid=" + msgbsid + "&msgcsid=" + msgcsid + ""; //发送消息参数
    //消息推送传参结束
    // body += "&action=insert&actid=" + userObj.ActivitiesID + "&data=" + str; //报名参数
    body += "&action=insert&actid=" + userObj.ActivitiesID + "&data=" + str + "&NewGC=" + userObj.code; //报名参数
    if (userObj.checkBtn == false) {
        userObj.checkBtn = true;
        $.getJSON(userObj.url + "?callback=?", body, function (data) {
            if (data.success) {
                try {
                    yc_ad_collect_adtrack(data.result);
                } catch (error) { }
                userObj.checkBtn = false;
                // alert('报名成功，感谢您的关注！');
                SetCookie('recid' + ActivitiesID, data.result);
                SetCookie('phone' + ActivitiesID, userObj.phone);
                Empty();

                //$(".reg_box").hide();
                //$(".mask-layer").removeClass("active");



                //$(".contentSlide").hide(); //隐藏轮播
                //$(".rulePage,.indexPage").hide();
                //$(".reg_box").hide();
                //$(".mask-layer").removeClass("active");
                location.href = "index_b.html";

            } else {
                if (data.result == '-2') {
                    userObj.checkBtn = false;
                    alert('此手机号已报过名，请勿重复报名');
                } else if (data.result == '-10') {
                    userObj.checkBtn = false;
                    alert('此活动报名已结束！');
                } else if (data.result == '-3') {
                    userObj.checkBtn = false;
                    alert('验证码错误');
                } else {
                    userObj.checkBtn = false;
                    alert('服务器繁忙中...');
                }
            }
        });
    }
}
/*
 注册表单重置
 */
function Empty() {
    $('#LoginName').val('');
    $('#LoginPhone').val('');
    $('#chexing').val('-1');
    $('#prov').val('-1');
    $('#city').val('-1');
    $('#dealer').val('-1');
    $('#buytime').val('-1');
    $('#sex').val('-1');
    $('#code').val('');
}
// function getPCDid(dealer) {
//     for (var i = 0; i < JSonData.Information.length; i++) {
//         var delInfo = JSonData.Information[i];
//         if (delInfo.dealer == dealer) {
//             userObj.provId = delInfo.provId;
//             userObj.cityId = delInfo.cityId;
//             userObj.dealerId = delInfo.dId;
//         }
//     }
// }
/*
 省份城市经销商联动
 */
function selProv() {
    var provstr = "<option value=\"-1\">" + userObj.txtArr[3] + "</option>";
    JSonData.Information.forEach(function (item, index) {
        if (provstr.indexOf(item.prov) < 0)
            if (bit_IpRegion.indexOf(item.prov) > -1) {
                provstr += "<option selected value=" + item.provId + " >" + item.prov + "</option>";
                selCity(item.prov);
            } else {
                provstr += "<option  value=" + item.provId + " >" + item.prov + "</option>";
            }
    })
    $('#prov').html(provstr);
}

function selCity(prov) {
    var citystr = "<option value=\"-1\">" + userObj.txtArr[4] + "</option>";
    JSonData.Information.forEach(function (item, index) {
        if (citystr.indexOf(item.city) < 0)
            if (item.prov == prov) {
                if (bit_locationInfo.cityName.indexOf(item.city) > -1 || item.city.indexOf(bit_locationInfo.cityName) > -1) {
                    citystr += "<option selected value=" + item.cityId + " >" + item.city + "</option>";
                    selDealer(item.city);
                } else {
                    citystr += "<option value=" + item.cityId + " >" + item.city + "</option>";
                }
            }
    })
    $('#city').html(citystr);
}

function selDealer(city) {
    var delstr = "<option value=\"-1\">" + userObj.txtArr[5] + "</option>";
    JSonData.Information.forEach(function (item, index) {
        if (item.city == city)
            // delstr += "<option did='" + item.url + "'  value=" + item.dealerId + " >" + item.dealer + "</option>";
            delstr += "<option  value=" + item.dealerId + " >" + item.dealer + "</option>";
    })
    $('#dealer').html(delstr);
}



function selCar() {
    var carstr = "<option value=\"-1\">" + userObj.txtArr[6] + "</option>";
    for (var i = 0; i < carData.Information.length; i++) {
        var carInfo = carData.Information[i];
        if (carstr.indexOf(carInfo.chexing) < 0) {
            carstr += "<option value=" + carInfo.chexingId + ">" + carInfo.chexing + "</option>";
        }
    }
    $('#chexing dl').html(carstr);
}



function dengluBynamephone() {
    stm_clicki('send', 'event', '页面切换', 'Click', '登录', 1);
    var dengluname = $.trim($('#dengluname').val());
    var dengluphone = $.trim($('#dengluphone').val());
    if (dengluname == "" || dengluname.indexOf("姓名") >= 0) {
        alert('请填写姓名');
        return;
    } else {
        if (GetStringRealLength(dengluname) > 20) {
            alert('请输入正确的姓名');
            return;
        }
    }
    if (dengluphone == "" || dengluphone == "电话") {
        alert('请填写手机号');
        return;
    } else {
        if (!BitautoMarketSk.PageLoad.prototype.isMobile(dengluphone)) {
            alert('请填写正确的手机号，如:13012345678');
            return;
        }
    }
    $('#dengluing').unbind();
    var body = "action=checkByNamePhoneGamesNum&actid=" + ActivitiesID + "&fb=" + dengluname + "&fc=" + dengluphone; //报名参数
    $.getJSON(url + "?callback=?", body, function (data) {
        if (data.success) {

            //   alert('登录成功！');

            if (data.result == "1") {
                SetCookie("recid" + ActivitiesID, data.message);
                SetCookie('phone' + ActivitiesID, dengluphone);
                $('.y-close').trigger("click");

                $('#dengluname').val('请填写真实姓名 以免影响奖品发放');
                $('#dengluphone').val('');

                $(".contentSlide").hide(); //隐藏轮播
                $(".rulePage,.indexPage").hide();
                $(".reg_box").hide();
                $(".mask-layer").removeClass("active");
                startGame();
            }
            else if (data.result == "-2") {
                alert('您已经参加过红包雨活动哦，勿重复参加~');
            }


        } else {
            if (data.result == "-1") {
                alert('登陆失败，请检查信息输入是否有误~');
            }
            else {
                alert('网络繁忙');
            }
        }
        $('#dengluing').bind("click", dengluBynamephone);
    });
}