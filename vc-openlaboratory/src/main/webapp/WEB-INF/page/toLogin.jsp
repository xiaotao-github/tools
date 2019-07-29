<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<style>
	body{
		overflow-y: hidden;
		background: #FFF;
	}
	.errorPageContain{
		width: 100%;
		overflow: hidden;
	}
	.errorPageContain img{
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: auto;
	}
	.errorMsg{
		width: 50%;
		text-align: center;
		position: absolute;
		top: 25%;
		left: 12%;
		font-size: 20px;
		color:#666;
	}
	.method{
		width: 40%;
		position: absolute;
		top: 30%;
		left: 30%;
		text-align: center;
		font-size: 14px;
	}
</style>
<head>
	<meta charset="UTF-8">
    <title>无法获取用户信息</title>
</head>
<body>
	<div class="errorPageContain">
		<img src="${cookie.RESOURCE_WAY.value }/system_file/img/errorBg.png" alt="">
		<div align="center">
		<p class="errorMsg" style="margin-left: 133px;">
		因您长时间未操作,您的用户信息已失效,请重新登录后再操作!
		<br/>
		系统将在<span class="second" style="color:red;">1</span>之后跳转到登录页面<a href="javascript:void(0)" onclick="toLogin()">(点击手动<span style="color:red;">跳转</span>)</a>
		</p>
		</div>
	</div> 
</body>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script> 
	<script type="text/javascript">
	
	 $.getJSON("${cookie.SSO_URL.value}/fbwisdomlabController/delectUserCache?callback=?",function(sysresult){
		// countSecond(10);
			console.log("200");
		}) 
	
	
	//刷新得到SSO
	/* if("${cookie.SSO_URL.value}"=="" ||"${cookie.SSO_URL.value}"==null){
		location.reload();
	} */
	countSecond(10);
	//倒计时
	function countSecond(t){
        var ct = t;
        var clock = setInterval(countTime,1000);
        function countTime(){
            if(ct==0){
                clearInterval(clock);
                parent.parent.location.href="${cookie.SSO_URL.value}/page/lab";;
                return false;
            }else{
                ct--;
                $(".second").html("&nbsp;"+ct+"秒&nbsp;");
            }
        }
        return false;
    }
	function toLogin(){
		parent.location.href="${cookie.SSO_URL.value}/page/lab";
	}
	
	
	//清理缓存
	 $.getJSON("${cookie.SSO_URL.value}/fbwisdomlabController/delectUserCache?callback=?",function(sysresult){
			
			console.log("200");
		}) 
	
	
	</script>
</html>
