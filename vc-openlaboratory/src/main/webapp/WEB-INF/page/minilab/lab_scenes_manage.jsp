<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML><html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/reset.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/public.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/experimen-newFont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/common.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/lab_change.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/lab_scenes_manage.css">
	<title>迷你实验室情景控制</title>
</head>
<body>
	<div class="container-page">
		<div class="scenes_title c-white">
			<h3>常用场景</h3>
		</div>
		<div class="btn_bar c-secendary" >
			<p class="lab_msg f-14"><span class="pr-15">名称:${lab.labName }</span><span class="pr-15">编号:${lab.labNumber }</span><i class="Hui-iconfont Hui-iconfont-tishi" onclick="showTips();"></i></p>
			<div class="lab_text pd-20 f-14">
				<p>${lab.labDescription }</p>
			</div>
			<ul class="row clearfix box-shadow">
			<li class="col-ms-4 col-md-4 col-xs-6" commandType="4" openOrClose="0">
					<p class="mt-20"><i class="labCtr-font labCtr-openAll f-icon"></i></p>
					<p>打开所有插座</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="4" openOrClose="1">
					<p class="mt-20"><i class="labCtr-font labCtr-closeAll f-icon"></i></p>
					<p>关闭所有插座</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="6" openOrClose="0" >
					<p class="mt-20"><i class="labCtr-font labCtr-curtainOpen f-icon"></i></p>
					<p>打开窗帘</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="6" openOrClose="1">
					<p class="mt-20"><i class="labCtr-font labCtr-curtainClose f-icon"></i></p>
					<p>关上窗帘</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="1"openOrClose="0">
					<p class="mt-20"><i class="labCtr-font labCtr-lightOn f-icon"></i></p>
					<p>打开照明</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="1" openOrClose="1">
					<p class="mt-20"><i class="labCtr-font labCtr-lightOff f-icon"></i></p>
					<p>关闭照明</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="3" openOrClose="0">
					<p class="mt-20"><i class="labCtr-font labCtr-electronicOn f-icon"></i></p>
					<p>工位通电</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="3" openOrClose="1">
					<p class="mt-20"><i class="labCtr-font labCtr-electronicOff f-icon"></i></p>
					<p>工位断电</p>
				</li>
			<!-- 	<li class="col-ms-4 col-md-4 col-xs-6" commandType="9">
					<p class="mt-20"><i class="labCtr-font labCtr-air-conditioningOn f-icon"></i></p>
					<p>开空调</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="10">
					<p class="mt-20"><i class="labCtr-font labCtr-air-conditioningOff f-icon"></i></p>
					<p>关空调</p>
				</li> -->
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="10"openOrClose="0">
					<p class="mt-20"><i class="labCtr-font labCtr-baojing f-icon"></i></p>
					<p>开启报警</p>
				</li>
				<li class="col-ms-4 col-md-4 col-xs-6" commandType="10"openOrClose="1">
					<p class="mt-20"><i class="labCtr-font labCtr-baojing f-icon"></i></p>
					<p>关闭报警</p>
				</li>
			</ul>
		</div>
	</div>
	<div class="body_shadow pos-f"></div>
	<div class="jump_btn pos-f">
		<ul class="mb-0">
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">设备控制</p>
				<a href="${ctx }/miniLab/labInfo/${lab.mainframeId }/${lab.labId}/3"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_equipmentControl.png" alt=""></a>
			</li>
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">智慧实验室列表</p>
				<a href="${ctx }/miniLab/list"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_equipmentControl.png" alt=""></a>
			</li>
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">设备管理</p>
				<a href="${ctx }/miniLab/toManagePage/${lab.mainframeId }/${lab.labId}"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_equipmentManage.png" alt=""></a>
			</li>
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">使用统计</p>
				<a href="${ctx }/miniLab/lab_used_count/${lab.labId}/${lab.labName}/1" class="pos-r"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_count.png" alt=""></a>
			</li>
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">退&nbsp;&nbsp;出</p>
				<a href="${ctx }/miniLab/list"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_exit.png" alt=""></a>
			</li>
		</ul>
	</div>

	<div class="jump_btn_sel pos-f">
		<img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_select.png" alt="" class="">
	</div>
	<script type="text/javascript">
	/* 每一套设备都有属于自己id */
	var WISDOMLAB = '${WISDOMLAB}';
	var wgId ='${lab.mainframeId }';
	</script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/lab_scenes_manage.js"></script>
</body>
</html>