<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>欢迎登录渥课虚拟仿真实验与教学平台</title>
	<link rel="stylesheet" href="${ctx }/staticfile/css/common.css">
	<link rel="stylesheet" href="${ctx }/staticfile/css/login_mobile.css">
	<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/Validform_v5.3.2_min.js"></script>
</head>
<body>
	<div class="loginMobileContainer">
		<p class="title">渥课&nbsp;V3.0</p>
		<div class="logo"><img src="${ctx }/staticfile/images/logo.png" alt=""></div>
		<form action="${SSO_URL }/userController/login" class="voocloginform" name="loginform">
			<div class="loginFill">
				<ul>
					<li class="userNum">
						<div>
							<input type="text"class="input" errormsg="出错" datatype="*" name="username" nullmsg="请填写您的账号!"  value="" placeholder="请填写您的账号" class="input">
						</div>
						<p class="Validform_checktip"></p>
					</li>
					<li class="userPassword">
						<div>
							<input type="password" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" errormsg="出错" datatype="*" nullmsg="请填写密码!" name="password" value="" placeholder="请填写密码" class="input">
						</div>
						<p class="Validform_checktip"></p>
					</li>
				<%-- 	<li class="userVerification">
						<div class="clearfix">
							<input type="text" errormsg="出错" datatype="*" nullmsg="请填写验证码!" name="code" value="" placeholder="验证码" class="input inputVerification" ajaxurl="${ctx}/validateCodeController/validateCode"/>
							<img src="${ctx }/validateCodeController/getImage" alt="验证码" class="verification">
						</div>
						<p class="Validform_checktip"></p>
					</li> --%>
					<li class="userLogin">
						<button type="submit" name="sub" value="登   录" id="subBtn" class="subBtn">登&emsp;&emsp;录</button>
					</li>
					<li>
						<p id="errormsg" style="position:relative;color:#d20d04;"></p>
					</li>
				</ul>
			</div>
				<input  type="hidden" class="input" value="${param.originalPath}" name="originalPath"/>
		</form>
	</div>
</body>
	<script type="text/javascript">
		var ctx = '${ctx}';
	</script>
	<script language="javascript" type="text/javascript" src="${ctx }/staticfile/js/login.js"></script>
</html>