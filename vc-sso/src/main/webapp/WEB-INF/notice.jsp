<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link rel="stylesheet" href="${ctx }/staticfile/font-awesome-4.7.0/css/index.css">
<link rel="stylesheet" href="${ctx }/staticfile/font-awesome-4.7.0/css/coreSurvey.css">
<link href="${ctx }/staticfile/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
<style type="text/css">
	.hide_content{
		 display: none;
	}
</style>
</head>
<body>
<!--主体-->
<div class="coresurvey">
    <!--列表-->
    <div class="coresurvey_main">
        <div class="coresurvey_main_left">
            <div class="top">
            	<ul class="list">
					<!-- <li class="on">
	                    <a class="name" title="" ids="">公告一</a>
	                </li>  -->
                </ul>
            </div>
        </div>
        <div class="coresurvey_main_right">
        	<!-- 内容 -->
            <div class="table system">
                <div class="top">
                    <p id="noticeTitle">标题</p>
                    <p id="noticeTime"></p>
                    <div style="clear: both"></div>
                </div>
                <div class="border"></div>
                <div class="bottom" id="noticeContent">
                	
                </div>
            </div>
        </div>
    </div>
</div>
<!--脚步-->
<script src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script>
    $(function () {
    	getAllNotice();
    });
    
    
    function getAllNotice(){
    	//获取最新公告
    	$.getJSON("${MANAGE_URL}/NoticeController/noticeList?callback=?",function(sysresult){
    		if(sysresult.status==200){
    			var data = sysresult.data;
    			var html="";
    			/* data-content="'+data[i].noticeText+'" */
    			for(var i=0;i<data.length;i++){
    				if(i==0){
    					html += '<li class="on"><a class="name" title="'+data[i].noticeTitle+'" ids="'+data[i].systemNoticeId+'">'+data[i].noticeTitle+'</a></li>';
    				}
    				else{
    					html += '<li><a class="name" title="'+data[i].noticeTitle+'" ids="'+data[i].systemNoticeId+'">'+data[i].noticeTitle+'</a></li>';
    				}
    			}
    			$(".top ul").append(html);
    			getNotice($(".list li:first a"));
    			clickListen();
    		}
    	});
    }
    
    function getNotice(obj){
    	var noticeId = $(obj).attr("ids");
    	$.getJSON("${MANAGE_URL}/NoticeController/ReadNotice/"+noticeId+"?callback=?",function(sysresult){
    		if(sysresult.status==200){
    			var data = sysresult.data;
    			if(data.noticeText != null){
    				$("#noticeContent").html(data.noticeText);
    			}else{
    				$("#noticeContent").html('<span>该内容没添加或者已删除</span>');
    			}
    			$("#noticeTitle").html(data.noticeTitle);
    			$("#noticeTime").html(data.createTimeToString);
    		}
    	});
    }
    
    function clickListen(){
        $(".top ul li").each(function (i) {
            $(this).click(function () {
                $(this).addClass("on").siblings().removeClass("on");
                getNotice($(".on a"));
            })
        });
    }
</script>
</body>
</html>