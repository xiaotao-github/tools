<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<style>
	body{
		overflow: hidden;
		background: #FFF;
	}
	.errorPageContain{
		position: relative;
		width: 1024px;
		height: 600px;
		margin: 0 auto;
		overflow: hidden;
	}
	.errorPageContain img{
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -960px;
		/* display: block;
		width: 100%; */
		height: auto;
	}
	.errorMsg{
		width: 50%;
		text-align: center;
		position: absolute;
		top: 440px;
		left: 12%;
		font-size: 20px;
		color:#666;
	}
	.method{
		width: 60%;
		position: absolute;
		top: 480px;
		left: 20%;
		text-align: center;
	}
</style>
<head>
	<meta charset="UTF-8">
	<title>出错了</title>
</head>
<body>
	<div class="errorPageContain">
		<img src="${cookie.RESOURCE_WAY.value }/system_file/img/errorBg.png" alt="">
		<p class="errorMsg">${msg}${param.msg }</p>
		<p class="method">
			你可以尝试
			<span><a href="javascript:void(0)" onclick="toLogin()">重新登录</a></span>
			一下,亦或是
			<span><br/>联系我们:<span>Email:zhangml@fengbiaoedu.com<br>QQ:190280385</span></span><br/>
			寻求解决方法!
		</p>
	</div> 
</body>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
$(function () {
    //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
    });
})
function toLogin(){
	parent.parent.location.href="${cookie.SSO_URL.value}/page/lab";
}
</script>
</html>