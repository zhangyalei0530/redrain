
        var wxshareconfig = {
            title: "吉利国六惠民购",
            desc: "技术吉利真囯六 亿元红包真惠民-吉利更多政策优惠待你解锁中…",
            imgurl: 'http://www.bitauto.com/topics/adtopic/geelyred/images/share_icon.jpg',
            link: getShareUrl()
        };
        // 微信分享方法
        fenxiang(wxshareconfig.title, wxshareconfig.imgurl, wxshareconfig.desc, wxshareconfig.link);
        //app自带分享
        window.YchH5Tools.Share({
            title: wxshareconfig.title,
            desc: wxshareconfig.desc,
            link: wxshareconfig.link,
            imgurl: wxshareconfig.imgurl,
            // 分享平台标识, 0-朋友圈 1-微信好友 2-QQ空间 3-QQ好友 4-新浪微博 6-浏览器
            platform: '012346'
        });
        function getShareUrl() {
            var url = window.location.href;
            var str = window.location.search;
            var ek = 'ychrfpa_tracker';
            var ev = '39_32_2_2361_2';
            var params = {};
            if (str.length > 0) {
                var num = str.indexOf("?")
                str = str.substr(num + 1);
                var arr = str.split("&"); //各个参数放到数组里
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    num = item.indexOf("=");
                    if (num > 0) {
                        name = item.substring(0, num);
                        value = item.substr(num + 1);
                        params[name] = value;
                    }
                }
            }
            params["ychrfpa_tracker"] = "39_32_2_2361_2";
            var qs = generateUrlQuery(params);
            if (url.indexOf("?") > 0) url = url.substr(0, url.indexOf("?"));
            return url + '?' + qs;
        }


        function getAppShareUrl() {
            var appconfig = {
                title: "吉利国六惠民购",
                desc: "技术吉利真囯六 亿元红包真惠民-吉利更多政策优惠待你解锁中…",
                link: window.location.href,
                imgurl: 'http://www.bitauto.com/topics/adtopic/geelyred/images/share_icon.jpg',
                width: 80,
                height: 80,
                platform: '012346',
                iscallback: 0
            };
            $.extend(true, appconfig, wxshareconfig);
            var appSource = globalVar.getAppSource();
            var url = "javascript:;";
            //1 报价大全，2 易车app
            if (appSource == 1) {
                /*title: 分享标题,desc: 分享内容,link: 分享链接,img_url: 分享图片,img_width: 图片宽度,img_height: 图片高度.(都需要urlencode)*/
                var title = encodeURIComponent(appconfig.title);
                var desc = encodeURIComponent(appconfig.desc);
                var link = encodeURIComponent(appconfig.link);
                var imgUrl = encodeURIComponent(appconfig.imgurl);
                var imgWidth = 80;
                if (appconfig.width != "") {
                    imgWidth = appconfig.width;
                }
                var imgHeight = 80;
                if (appconfig.height != "") {
                    imgHeight = appconfig.height;
                }
                var platform = "012346";
                if (appconfig.platform != "") {
                    platform = appconfig.platform;
                }
                var iscallback = 0;
                if (appconfig.iscallback != "") {
                    iscallback = appconfig.iscallback;
                }
                url = "app://share?title=" + title + "&desc=" + desc + "&link=" + link + "&img_url=" + imgUrl
                    + "&img_width=" + imgWidth + "&img_height=" + imgHeight + "&platform=" + platform + "&iscallback=" + iscallback;
            }
            else if (appSource == 2) {
                var title = encodeURIComponent(appconfig.title);
                var desc = encodeURIComponent(appconfig.desc);
                var link = encodeURIComponent(appconfig.link);
                var imgUrl = encodeURIComponent(appconfig.imgurl);
                var jscallback = '';
                if (appconfig.jscallback != "") {
                    jscallback = appconfig.jscallback;
                }
                url = "bitauto.yicheapp://yiche.app/com.share?type=-1&title=" + title + "&text=" + desc + "&url=" + link + "&imageurl=" + imgUrl + "&jscallback=" + jscallback;
            }
            return url;
        }
        function generateUrlQuery(params) {
            var result = "";
            for (var key in params) {
                result += key + encodeURIComponent(params[key]) + "&";
            }
            if (result.length > 0) {
                result = result.substring(0, result.length - 1);
            }
            return result;
        }

        $(function () {
            //$(".getPrize").show();
            var appSource = globalVar.getAppSource();
            if (appSource == 1 || appSource == 2) {
                var shareUrl = getAppShareUrl();
                $(".btn_share a").attr("href", shareUrl);
                $(".share_btn,.share_wx_btn").attr("href", shareUrl);
                //$(".share_btn").attr("href", shareUrl);
            } else {
                $(".btn_share,.share_btn,.share_wx_btn").on("click", function () {
                    if (globalVar.is_weixin()) {
                        // 微信端分享给朋友
                        $(".sharePage").show();
                    } else {
                        $(".m-sharePage").show();
                    }
                });
            }


        });