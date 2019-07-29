<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!--脚部-->


<div class="clear footer">
    <div class="footer_content">
        <ul>
            <li>Copyright © 2017-2018 <a href="http://www.fengbiaoedu.com/" target="_blank">广州风标教育技术股份有限公司</a> 版权所有</li>
        </ul>
    </div>
</div>
<!--新闻公告上下滚动-->
<script src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/layer.js"></script>
<script type="text/javascript">
	//获取最新公告
		$.getJSON("${MANAGE_URL}/NoticeController/noticeList?callback=?",function(sysresult){
		if(sysresult.status==200){
			var data = sysresult.data;
			var html="";
			for(var i=0;i<data.length;i++){
				html += '<li><a  ids="'+data[i].systemNoticeId+'" data-title="'+data[i].noticeTitle+'"  data-content="'+data[i].noticeText+'" onclick="showContent(this)"><span>'+data[i].createTimeToString+'</span>'+data[i].noticeTitle+'</a></li>';
			}
			if(data.length==0){html += "<li>暂无公告</li>";}
			$("#scrollDiv ul").append(html);
		}
	});
	
	/* function showContent(obj){
		//备注：需要的数据在上面，跨域拿到了，控制台打印就可以了哈
		var title = $(obj).attr("data-title");
		var myContent= $(obj).attr("data-content");
		if(myContent == 'null') {
			myContent="";
		}
		
		layer.open({
			type:1,
			content: '<br><p class="pd-20 textIndent-2">'+myContent+'</p>',
			area:['500px','300px'],
			title: false
		})
	} */
	
	function showContent(obj){
		//备注：需要的数据在上面，跨域拿到了，控制台打印就可以了哈
		var index = layer.open({
			type: 2,
			title: false,
			content: '${ctx}/fbwisdomlabController/toNoticePage',
			area: ['800px','600px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
	}
	
	function out(){
		layer.confirm('确认要退出登录吗?',{title:'信息'},function(index){
			$.ajax({
				async:false,
				type: 'GET',
				url: '${ctx}/fbwisdomlablogin/fbwisdomlablogOut',
				dataType: 'json',	
				success:function(sysresult){
					console.log(sysresult)
					
					if(sysresult.status==200){
						// window.location.href="${ctx}/index.jsp";
		       		 	//console.log(window.location.href)
						window.location.href="${ctx}/paeg/lab";
					}
				}
			})
		});
	}

	/* $(function () {
	    //防止页面后退
	    history.pushState(null, null, document.URL);
	    window.addEventListener('popstate', function () {
	            history.pushState(null, null, document.URL);
	    });
	}) */

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
        $("#scrollDiv").hover(function () {
            clearInterval(myar);
        },
        function () {
            myar = setInterval('AutoScroll("#scrollDiv")', 3000)
        });
    });

    $(document).ready(function () {
        $('.right .name').hover(function () {
            $(this).css('backgroundColor', '#545353');
            $(".right ul").css('display', 'block');
        }, function () {
            $(this).css('backgroundColor', '#2e2e2e');
            $(".right ul").css('display', 'none');
        });
        $(".right ul").hover(function () {
            $(this).css('display', 'block');
        }, function () {
            $(this).css('display', 'none');
        });
    });


    $(function () {
    	$("#Validform_msg").addClass("hide_Validform");
    	
        $("#core-1").mouseover(function () {
            src = this.src;
            $(this).parent().next().css("color","#2b73a0");
            $(this).attr("src", "${ctx }/staticfile/images/teach-1.png");
        }).mouseout(function () {
        	 $(this).parent().next().css("color","#333333");
            $(this).attr("src", src);
        });
        $("#core-2").mouseover(function () {
            src = this.src;
            $(this).parent().next().css("color","#2b73a0");
            $(this).attr("src", "${ctx }/staticfile/images/exper-1.png");
        }).mouseout(function () {
        	$(this).parent().next().css("color","#333333");
            $(this).attr("src", src);
        });
        $("#core-3").mouseover(function () {
            src = this.src;
            $(this).parent().next().css("color","#2b73a0");
            $(this).attr("src", "${ctx }/staticfile/images/communicate-1.png");
        }).mouseout(function () {
        	$(this).parent().next().css("color","#333333");
            $(this).attr("src", src);
        });
        $("#core-4").mouseover(function () {
            src = this.src;
            $(this).parent().next().css("color","#2b73a0");
            $(this).attr("src", "${ctx }/staticfile/images/test-1.png");
        }).mouseout(function () {
        	$(this).parent().next().css("color","#333333");
            $(this).attr("src", src);
        });
        //协同学习
         $("#core-5").mouseover(function () {
            src = this.src;
            $(this).parent().next().css("color","#2b73a0");
            $(this).attr("src", "${ctx }/staticfile/images/coo-1.png");
        }).mouseout(function () {
        	$(this).parent().next().css("color","#333333");
            $(this).attr("src", src);
        });          
        
        $(".corename").mouseover(function () {
            $(this).css("color","#2b73a0");
        }).mouseout(function () {
            $(this).css("color","#333333");
        });

    })
</script>
<!--退出-->
