<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!--脚部-->
<div class="clear footer">
    <div class="footer_content">
        <ul>
            <li>Copyright © 2017-2018 <a href="http://www.fengbiaoedu.com/" target="_blank">广州风标教育技术股份有限公司</a> 版权所有</li>
        </ul>
    </div>
</div>
<script src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/layer.js"></script>
<script type="text/javascript">
	var realPath = '${ctx}'+"";
	
	//获取最新公告
	$.getJSON("${MANAGE_URL}/NoticeController/noticeList?callback=?",function(sysresult){
		if(sysresult.status==200){
			var data = sysresult.data;
			var html="";
			/* data-content="'+data[i].noticeText+'" */
			for(var i=0;i<data.length;i++){
				html += '<li><a ids="'+data[i].systemNoticeId+'"  data-title="'+data[i].noticeTitle+'"   onclick="showContent(this)"><span>'+data[i].createTimeToString+'</span>'+data[i].noticeTitle+'</a></li>';
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
	
	function out(){
		layer.confirm('确认要退出登录吗?',{title:'信息'},function(index){
			$.ajax({
				async:false,
				type: 'GET',
				url: '${ctx}/fbwisdomlabController/fbwisdomlablogOut',
				dataType: 'json',	
				success:function(sysresult){
					console.log(sysresult)
					
					if(sysresult.status==200){
<<<<<<< .mine
						 window.location.href="${ctx}/page/lab";
||||||| .r11824
						 window.location.href="${ctx}/page/index.jsp";
=======
						 window.location.href="${ctx}/index.jsp";
>>>>>>> .r12521
		       		 	//console.log(window.location.href)
					}
				}
			})
		});
	}
	
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

</script>
<script src="${ctx }/staticfile/js/student_common.js"></script>