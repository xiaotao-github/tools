    function AutoScroll(obj) {
        $(obj).find("ul:first").animate({
            marginTop: "-30px"
        }, 500, function () {
            $(this).css({
                marginTop: "0px"
            }).find("li:first").appendTo(this);
        });
    }
    $(document).ready(function () {
        var myar = setInterval('AutoScroll("#scrollDiv")', 3000);
        $("#scrollDiv").stop().hover(function () {
            clearInterval(myar);
        },
        function () {
            myar = setInterval('AutoScroll("#scrollDiv")', 3000)
        });

        $('.header .top .right').off().hover(function(){
            $(".header .right ul").stop().slideToggle(300);
        });

        // $(".right ul").hover(function () {
        //     $(this).css('display', 'block');
        // }, function () {
        //     $(this).css('display', 'none');
        // });

        $("#core-1").mouseover(function () {
            src = this.src;
            $(this).attr("src", realPath+"/staticfile/images/student/learn-1.png");
        }).mouseout(function () {
            $(this).attr("src", src);
        });
        $("#core-2").mouseover(function () {
            src = this.src;
            $(this).attr("src", realPath+"/staticfile/images/student/experiment-1.png");
        }).mouseout(function () {
            $(this).attr("src", src);
        });
        $("#core-3").mouseover(function () {
            src = this.src;
            $(this).attr("src", realPath+"/staticfile/images/student/test-1.png");
        }).mouseout(function () {
            $(this).attr("src", src);
        });
        $("#core-4").mouseover(function () {
            src = this.src;
            $(this).attr("src", realPath+"/staticfile/images/student/communicate-2.png");
        }).mouseout(function () {
            $(this).attr("src", src);
        });
        //协同学习
        $("#core-5").mouseover(function () {
            src = this.src;
            $(this).attr("src", realPath+"/staticfile/images/student/stucoo-1.png");
        }).mouseout(function () {
            $(this).attr("src", src);
        });

    })