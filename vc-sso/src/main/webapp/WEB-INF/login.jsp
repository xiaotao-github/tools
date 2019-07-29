<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name=”renderer” content=”webkit” /> 

<!-- <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" /> -->
<title>欢迎登录渥课虚拟仿真实验与教学平台</title>
<link rel="stylesheet" href="${ctx }/staticfile/css/login.css">
<link rel="stylesheet" href="${ctx }/staticfile/css/common.css">
<link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />

</head>
<body>
	<div class="loginPage clearfix">
		<div class="loginHeader">
			<div class="inner">
					<img src="${RESOURCE_WAY }/system_file/img/logo.png" alt="logo" class="collegeLogo">
				<p class="headerTxt">
					<%-- <span class="collegeTitle"> <img src="${ctx }/staticfile/images/collegeName.png" alt="collegeName">
					</span>  --%><span class="loginTitle"> <img src="${ctx }/staticfile/images/loginTitle.png" alt="虚拟仿真教学实验平台">
					</span>
				</p>
				<ul class="loginNav">
					<li><a href="${SSO_URL }/webController/main">回到首页</a></li>
				</ul>
			</div>
		</div>
		<!--login.js 用ajax提交  -->
		<div class="loginContain">
			<div class="inner">
				<div class="loginBox clearfix">
					<div class="loginform clearfix">
						<form action="${ctx }/userController/login" class="voocloginform" name="loginform" method="post" >
							<ul class="loginUserform clearfix">
								<li class="userNum clearfix"><span class="span">账号：</span>
									<div class="div">
										<i class="iconfont icon-usernum"></i> <input type="text"
											class="input" errormsg="出错" datatype="*" nullmsg="请填写您的账号!"
											name="username" value="">
									</div> <span class="Validform_checktip"></span>
								</li>
								<li class="userPassword clearfix"><span class="span">密码：</span>
									<div class="div">
										<i class="iconfont icon-password"></i> <input type="password"
											class="input"
											errormsg="出错" datatype="*" nullmsg="请填写密码!" name="password"
											value="">
										<input type="hidden" name="key" value=""> </input>
										<input type="hidden" name="iv" value=""> </input>
									</div> <span class="Validform_checktip"></span>
								</li>
							 	<%-- <li class="userVerification clearfix"><span class="span">验证码：</span>
									<div class="div" style="cursor:pointer;">
										<i class="iconfont icon-verificate"></i> <input type="text"
											class="input" errormsg="出错" datatype="*" nullmsg="请填写验证码!"
											name="validateCode" value="" id="param" ajaxurl="${ctx}/validateCodeController/validateCode"> <img src="${ctx }/validateCodeController/getImage"
											alt="验证码" class="verification">
									</div> <span class="Validform_checktip"></span>
								</li>  --%>
							</ul>
							<p id="errormsg" style="margin-left:120px;color:#d20d04;height:30px;line-height:30px;font-size:14px;"></p>
							<input type="button" name="sub" value="登   录" id="subBtn" class="subBtn" >
							<p style="padding-left:154px;cursor:pointer;" onclick="openQRCode();">登录掌上课堂!</p>
						</form>
					</div>
				</div>
			</div>
		</div>
		<p class="QRCodeDetail bc-lightBlue" style="display:none;">
			<img src="${ctx}/QRCodeController/getQRCode?originalPath=${ctx}/studentPage/index.html" alt="" style="width:100%;height:100%;display:block;">
		</p>
		<div class="loginFooter">
			<div class="inner">
        		<ul>
           			 <li>Copyright © 2017-2018 <a href="http://www.fengbiaoedu.com/" target="_blank">广州风标教育技术股份有限公司</a> 版权所有</li>
       			 </ul>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		var ctx = '${ctx}';
	</script>
	<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/aes.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/pad-zeropadding-min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/Validform_v5.3.2_min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/layer.js"></script>
	 <script type="text/javascript" src="${ctx }/staticfile/js/login.js"></script> 
	<script type="text/javascript">
	if('${status}' == 201){
		$("#errormsg").html('${msg}');
		}else if('${status}'==204){
			$("#code").html('${msg}');
		}else if('${status}'==202){
			$("#errormsg").html('${msg}');	
		}else if('${status}'==400){
			$("#errormsg").html('${msg}');	
		}else if('${status}'==205){
			$("#errormsg").html('${msg}');	
		}else{
			//忽略
		}
		function openQRCode(){
			var index = layer.open({
				type:1,
				content:$(".QRCodeDetail"),
				title:false,
				area:['400px','400px']
			});
		}
		
		//var webSiteUrl = "${WEB_SITE_URL}";
		var resourceWay = "${RESOURCE_WAY }";
		/* if(webSiteUrl == ''){
			window.location.reload();
		} */
	

	
	</script>
</body>
</html>