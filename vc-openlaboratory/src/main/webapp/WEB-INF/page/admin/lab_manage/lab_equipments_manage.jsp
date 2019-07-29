<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<!--[if lt IE 9]>
	<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>
	<![endif]-->
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/lab_equipments_manage.css">
	<!--[if IE 6]>
	<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
	<script>DD_belatedPNG.fix('*');</script>
	<![endif]-->
	<title>实验室管理</title>
</head>
<body>

	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验室管理 <span class="c-gray en">&gt;</span>实验室设备管理
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>
	
	<div class="container-page">
		<div class="pd-10 bk-gray bg-1">
			<p class="f-20" style="margin-bottom:0;"><span class="fw-bold c-orange f-22">${experimentLab.labName }</span>[<span>${experimentLab.labNumber }</span>]</p>
		</div>
		<div class="typePart clearfix mt-20 bk-gray radius">
			<ul class="clearfix col-lg-6 col-sm-6">
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-light">
					<p class="typeTitle pd-5">type: 灯控</p>
					<c:forEach items="${equ_1 }" var="temp1">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp1.equId }">
							<p><i class="experimentFont experimentFont-dengpao"></i></p>
							<p><span>${temp1.epName }</span></p>
						</div>	
					</c:forEach>
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-hongwai">
					<p class="typeTitle pd-5">type: 红外</p>
					<c:forEach items="${equ_2 }" var="temp2">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp2.equId }">
							<p><i class="experimentFont experimentFont-hongwaizhuanfa"></i></p>
							<p><span>${temp2.epName }</span></p>
						</div>
					</c:forEach>
					
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-seat">
					<p class="typeTitle pd-5">type: 工位</p>
					<c:forEach items="${equ_3 }" var="temp3">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp3.equId }">
						<p><i class="experimentFont experimentFont-diannaozhuo"></i></p>
						<p><span>${temp3.epName }</span></p>
						</div>
					</c:forEach>
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-camera">
					<p class="typeTitle pd-5">type: 摄像头</p>
					<c:forEach items="${equ_5 }" var="temp5">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp5.equId }">
							<p><i class="experimentFont experimentFont-camera"></i></p>
							<p><span>${temp5.epName }</span></p>
						</div>
					</c:forEach>
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-chazuo">
					<p class="typeTitle pd-5">type: 插座</p>
					<c:forEach items="${equ_4 }" var="temp4">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp4.equId }">
							<p><i class="experimentFont experimentFont-chazuo"></i></p>
							<p><span>${temp4.epName }</span></p>
						</div>
					</c:forEach>
				</li>
			</ul>
			<ul class="clearfix col-lg-6 col-sm-6">
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-reboot">
					<p class="typeTitle pd-5">type: 电源总开关</p>
					<c:forEach items="${equ_8 }" var="temp8">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp8.equId }">
							<p><i class="experimentFont experimentFont-reboot"></i></p>
							<p><span>${temp8.epName }</span></p>
						</div>
					</c:forEach>
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-curtain">
					<p class="typeTitle pd-5">type: 窗帘</p>
					<c:forEach items="${equ_6 }" var="temp6">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp6.equId }">
							<p><i class="experimentFont experimentFont-chuanglian"></i></p>
							<p><span>${temp6.epName }</span></p>
						</div>
					</c:forEach>
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-sensor">
					<p class="typeTitle pd-5">type: 传感器</p>
					<c:forEach items="${equ_9 }" var="temp9">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp9.equId }">
							<p><i class="experimentFont experimentFont-WSD"></i></p>
							<p><span>${temp9.epName }</span></p>
						</div>
					</c:forEach>
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 clearfix classify-door">
					<p class="typeTitle pd-5">type: 门</p>
					<c:forEach items="${equ_7 }" var="temp7">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 col-xs-6 eachEquipment" thisId="${temp7.equId }">
							<p><i class="experimentFont experimentFont-el-icon-men"></i></p>
							<p><span>${temp7.epName }</span></p>
						</div>
					</c:forEach>
					
				</li>
				<li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 classify-warning">
					<p class="typeTitle pd-5">type: 报警设备</p>
					<c:forEach items="${equ_10 }" var="temp10">
						<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 eachEquipment" thisId="${temp10.equId }">
							<p><i class="experimentFont experimentFont-warning"></i></p>
							<p><span>${temp10.epName }</span></p>
						</div>
					</c:forEach>
					
				</li>
				<!-- <li class="col-lg-12 col-sm-12 box-shadow radius bk-gray pd-5 classify-smoke">
					<p class="typeTitle pd-5">type: 烟雾</p>
					<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 eachEquipment" thisId="10">
						<p><i class="experimentFont experimentFont-yanwu"></i></p>
						<p><span>这里是设备名称</span></p>
					</div>
				</li> -->
			</ul>
		</div>
		<div class="equipments pd-15 mt-20 bk-gray box-shadow radius">
			<c:if test="${empty equ_0}">
				<div class="text-c row" style="color:#ccc;"><span style="color: #ddd;">————————————————</span> 暂无未设置的设备! <span style="color: #ddd;">——————————————</span></div>
			</c:if>
			<ul class="equipmentsList clearfix row text-c">
				<c:forEach items="${equ_0 }" var="o">
					<li class="eachEquipment col-lg-2 col-sm-3 col-xs-6" thisId="${o.equId }">
						<div class="box-shadow radius bk-gray">
							<p><i class="experimentFont experimentFont-equipment"></i></p>
							<p class="equipmentName"><span>${o.epName }</span></p>
						</div>
					</li>
				</c:forEach>
			</ul>
		</div>
	</div>
	
	<div class="editType pd-20">
		<p class="bk-gray bg-1 pd-5 f-20 equipmentTitle" style="color:#4ca3bc;"><strong>这里是设备的名称</strong></p>
		<ul class="clearfix text-c">
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="1">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-dengpao"></i></p>
					<p><span>灯控</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="2">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-hongwaizhuanfa"></i></p>
					<p><span>红外</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="3">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-diannaozhuo"></i></p>
					<p><span>工位</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="5">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-camera"></i></p>
					<p><span>摄像头</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="4">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-chazuo"></i></p>
					<p><span>插座</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="8">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-reboot"></i></p>
					<p><span>总开关</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="6">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-chuanglian"></i></p>
					<p><span>窗帘</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="9">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-WSD"></i></p>
					<p><span>传感器</span></p>
				</div>
			</li>
			<li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="7">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-el-icon-men"></i></p>
					<p><span>门</span></p>
				</div>
			</li>
			<!-- <li class="col-lg-3 col-sm-3 col-xs-4 mt-10 mb-10" thisType="11">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-yanwu"></i></p>
					<p><span>烟雾</span></p>
				</div>
			</li> -->
			<li class="col-lg-3 col-sm-3 mt-10 mb-10" thisType="10">
				<div class="box-shadow radius bk-gray">
					<p><i class="experimentFont experimentFont-warning"></i></p>
					<p><span>报警设备</span></p>
				</div>
			</li>
		</ul>
		<p class="text-r mt-20 settingBtn"><span class="pd-15 pt-5 pb-5 btn btn-primary radius mr-10" onclick="upTypeSel();">确&emsp;定</span></p>
		<p class="text-r mt-20 reeditBtn"><span class="pd-15 pt-5 pb-5 btn btn-primary radius mr-10" onclick="upTypeChange();">确&emsp;定</span></p>
	</div>
	
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
<script type="text/javascript">
	var ctx = '${ctx}';
</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>

<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/lab_equipments_manage.js"></script>
</body>
</html>