//弹窗
;(function ($) {
    var defaults = {
        level:1, //pop level
        type: 1, //pop type (ps:not pop style)
        desc:"", 
        callback: function(){}
    };

    var Panel = function(el,options){
        this.$el = $(el);
        this.opts = $.extend( {}, defaults, options) ;
    };
    Panel.prototype = {
        init: function(){
            var _this = this;
            var pn = this.$el
            if(this.opts.type == 1){
                if ($('.mask').length < 1) { 
                    $('body').append("<div class='mask animating'></div>");
                    $('.mask').on("touchmove",function(e){
                        e.preventDefault();
                        e.stopPropagation()
                    })
                }
                var mLayer = $('.mask');
                var close = pn.find(".jsClose");

                if(_this.opts.level == 1){
                    close.off("close").on("close",function(){
                        $.fn.popPanel.hide(pn,mLayer)
                    })
                    $.fn.popPanel.show(pn,mLayer)
                }else if(_this.opts.level == 2){
                    close.off("close").on("close",function(){
                        $.fn.popPanel.hide(pn)
                    })
                    $.fn.popPanel.show(pn)
                }
                close.off("click").on("click",function(e){
                    e.preventDefault();
                    e.stopPropagation()
                    $(this).trigger("close")
                })

                mLayer.off("click").on("click",function(e){
                    e.preventDefault();
                    e.stopPropagation()
                    $.fn.popPanel.hide($(".pop-panel"),mLayer)
                })
    
            }else if(this.opts.type == 2) {
                //type:2 自动隐藏弹层
                var desc = this.opts.desc
                pn.html(desc);
                $.fn.popPanel.show(pn)

                var timer = setTimeout(function () {
                    $.fn.popPanel.hide(pn)
                }, 1500);
            }else{
                console.log("弹窗类型错误")
            }
            
            this.opts.callback()
        }
    };
    
    $.fn.popPanel = function (options) {
        return this.each(function(){
            var pop = new Panel(this, options)
            pop.init()
        });

    }
    $.fn.popPanel.show = function($el,mask) {
        $('body').css({ overflowY: 'hidden' });
        if(mask){
            mask.addClass("active on")
        }
        $el.addClass("active pop-out");
    }

    $.fn.popPanel.hide = function($el,mask) {
        $("body").css({ overflowY: "auto" })
        if(mask){
            mask.removeClass("active on")
        }
        $el.removeClass("active pop-out");
    }

    $.fn.popPanel.return = function($el) {
        $el.removeClass("active pop-out");
    }

})(jQuery);