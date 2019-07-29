<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
<title>个人信息</title>
</head>
<body>
<div class="page-container">
	</br>
	<div class="row cl">
		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
		
		</div>
		<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-r">
				<div class="text-c"><img id="ImgPr" class="avatar size-XXL thumbnail" src="${cookie.RESOURCE_WAY.value }/system_file/img/touxiang.jpg"></div>
				<p class="text-c lh-24">这是您的第 <span id="loginNum" class="c-orange"></span>次登录,您上一次登录的时间为 ：<span id="preTime" class="c-orange"></span></p>	
		</div>
		<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-l">
			<div class="row cl lh-30">
				<label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-r">
					<span class=" pr-5"><i class="iconfont icon-yonghuming3"></i></span>姓名：
				</label>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-l">
					<span id="userName"></span>
				</div>
			</div>
			<div class="row cl lh-30">
				<label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-r">
					<span class="pr-5"><i class="iconfont icon-denglu_suoshuyuanxi"></i></span>院系：
				</label>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-l">
					<span id="departmentName"></span>
				</div>
			</div>
			<div class="row cl lh-30">
				<label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-r">
					<span class="pr-5"><i class="iconfont icon-quanxian2"></i></span>权限：
				</label>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-l">
					<span id="roleName"></span>
				</div>
			</div>
			<div class="row cl lh-30">
				<label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-r">
					<span class="pr-5"><i class="iconfont icon-youxiang"></i></span>邮箱：
				</label>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-l">
					<span id="email"></span>
				</div>
			</div>
			<div class="row cl lh-30">
				<label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-r">
					<span class="pr-5"><i class="iconfont icon-xihebiaozhunyuanjian439"></i></span>电话：
				</label>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 text-l">
					<span id="telephone"></span>
				</div>
			</div>
		</div>
		<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
		
		</div>
	</div>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->
<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript">
$.getJSON("${cookie.SSO_URL.value}/userController/queryUser/${cookie.vcoocUserId.value}?callback=?",function(sysresult){
		if(sysresult.status!=200){
			console.log(sysresult.msg);
			return ;
		}
		if(sysresult.data.imagePath!=null){
			$("#ImgPr").attr("src","${cookie.RESOURCE_WAY.value}/"+sysresult.data.imagePath);
		}else{
			$("#ImgPr").attr("src","${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg");
		}
		$("#userName").html(sysresult.data.name);
		
		if(sysresult.data.department!=null){
			$("#departmentName").html(sysresult.data.department.name);
		}else{
			$("#departmentName").html("无");
		}
		if(sysresult.data.role==null){
			$("#roleName").html("无");
		}else{
			$("#roleName").html(sysresult.data.role.name);
		}
		if(sysresult.data.email==null){
			$("#email").html("无");
		}else{
			$("#email").html(sysresult.data.email);
		}
		if(sysresult.data.phone==null){
			$("#telephone").html("无");
		}else{
			$("#telephone").html(sysresult.data.phone);
		}
		if(sysresult.data.loginNumber==null){
			$("#loginNum").html("0");
		}else{
			$("#loginNum").html(sysresult.data.loginNumber);
		}
		if(sysresult.data.preTime==null){
			var t = formatTime(sysresult.data.updateTime,'yyyy-MM-dd HH:mm:ss');
			$("#preTime").html(t);
		}else{
			var t = formatTime(sysresult.data.preTime,'yyyy-MM-dd HH:mm:ss');
			$("#preTime").html(t);
		}
	});
	<!--时间格式化的js-->
	function formatTime(time,format){
	 var t = new Date(time);
	var tf = function(i) {
        return (i < 10 ? '0': '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g,
    function(a) {
        switch (a) {
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
        }
    });
	}
</script>
