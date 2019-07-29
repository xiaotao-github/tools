<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" /> -->
		<title>实验室开放预约管理系统</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/Hui-iconfont/1.0.8/iconfont.css" />
		<link href="${ctx }/staticfile/css/loginlab.css" rel="stylesheet" type="text/css" />
	</head>
	<body>      
		<div class="login">
			<div class="login-head">
				<div class="login-head-a">
					<img src="${ctx }/staticfile/images/logo.png" title="" alt=""/>
					<!-- <p>风标教育</p> -->
				</div>
				<div class="login-head-b">实验室开放预约管理系统</div>
			</div>
			<div class="login-con">
				<div class="login-a">
					<form id="loginForm" action="${ctx }/fbwisdomlabController/fbwisdomlablogin" class="voocloginform" name="loginform" method="post" >
						<div class="login-b">
							<div class="login-b-a">用户登录</div>
							<div class="login-b-b">
								<ul>
									<li>
										<div>
											<label for="username" >账 &nbsp;&nbsp;号：</label>
											<input type="text" name="username" errormsg="出错" datatype="*" nullmsg="请填写您的账号!" value="" />
										</div>
										<h1 id="m-tip" class="Validform_checktip"></h1>
									</li>
									<li>
										<div>
											<label for="password">密 &nbsp;&nbsp;码：</label>
											<input type="password" id="password" name="password" errormsg="出错" datatype="*" nullmsg="请填写密码!" value="" />
											<input type="hidden" name="key" value=""></input>
											<input type="hidden" name="iv" value=""></input>
										</div>
										<h1 id="p-tip" class="Validform_checktip"></h1>
									</li>
									<li>
										<div>
											<label >验证码：</label>
											<input type="text" id="param" name="validateCode" errormsg="出错"  value="" datatype="*" nullmsg="请填写验证码!" ajaxurl="${ctx}/validateCodeController/validateCode"/>
											<img src="${ctx }/fbwisdomlabController/getImage" alt="验证码" class="verification">
										</div>
											<!-- <input type="text" id="checkCode" class="code" style="width: 55px" /><a href="#" onClick="createCode()">看不清楚</a> -->
										<h1 id="c-tip" class="Validform_checktip"></h1>
									</li>
									<li class="login-x">
										<input type="button" name="sub" value="登   录" id="subBtn" class="subBtn" >
										<!-- <div class="f-l pl-5">
											<span class="btn radius f-l" onclick="showUploadGif_QR();" style="cursor:pointer;"><i class="Hui-iconfont Hui-iconfont-saoyisao" style="padding-right:5px;"></i>扫码进入实验室</span>
										</div> -->
										<!--  -->
										<div class="bc-white uploadGif_QR pd-20" style="display:none;">
										  		<img src="${SSO_URL}/QRCodeController/getQRCodeToUrl?originalPath=${PEXPERIMENTOPEN}/miniLab/list"  alt="" style="width:100%;height:100%;display:block;">
										 </div>										
									</li>
								</ul>
							</div>
							<div style="height: auto;">
								<p id="errormsg" style="color:#d20d04;height:30px;line-height:30px;font-size:14px;text-align:center;"></p>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="login-foot"><a href="http://www.fengbiaoedu.com/" target="_blank">广州风标教育技术股份有限公司</a>©2018 by <a href="http://www.fengbiaoedu.com/" target="_blank">fengbiaoedu</a> 粤ICP备13038558号-2</div>
		</div>
	</body>
	<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/aes.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/pad-zeropadding-min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/Validform_v5.3.2_min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/login.js"></script> 
	<script type="text/javascript" src="${ctx }/staticfile/js/layer.js"></script>
	 
	<script type="text/javascript">
		var ctx = '${ctx}';
		$(function () {
		    //防止页面后退
		    history.pushState(null, null, document.URL);
		    window.addEventListener('popstate', function () {
		            history.pushState(null, null, document.URL);
		    });
		})
	
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
		var resourceWay = "${RESOURCE_WAY }";
		//var webSiteUrl = "${WEB_SITE_URL}";
		/* if(webSiteUrl == ''){
			window.location.reload();
		} */
		
		/* 二维码 */
		function showUploadGif_QR(){
    	layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        content: $('.uploadGif_QR'),
        area: ['400px','auto']
    })
}
	
	</script>
</html>
