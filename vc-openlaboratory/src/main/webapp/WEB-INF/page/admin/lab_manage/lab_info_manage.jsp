<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
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
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/lab_info_manage.css">
	<!--[if IE 6]>
	<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
	<script>DD_belatedPNG.fix('*');</script>
	<![endif]-->
	<title>实验室管理</title>
</head>
<body>

	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验室管理
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>
		
	<div class="container-page">
		<div class="part1 row box-shadow clearfix pos-r">
			<div class="col-lg-12 labMsg">
				<p class="f-22"><span>${exLab.labName}</span></p>
				<p>编号: <span>${exLab.labNumber}</span></p>
				<p class="description">简介: <span>${exLab.labDescription}</span></p>
			</div>
			<div class="labUseCount pos-a">
			<c:if test="${menuParam eq 2 }">
			 <shiro:hasPermission name="实验室设备管理(院系)">
				<span class="btn btn-warning radius pdl-15 pdr-15" data-title="${exLab.labName}实验室设备管理" data-href="${ctx }/equipment/toManagePage/${exLab.mainframeId}/${exLab.labId}" onclick="Hui_admin_tab(this);">设备管理</span>
			</shiro:hasPermission>
			</c:if>
			<c:if test="${menuParam eq 1 }">
			 <shiro:hasPermission name="实验室设备管理(所有)">
				<span class="btn btn-warning radius pdl-15 pdr-15" data-title="${exLab.labName}实验室设备管理" data-href="${ctx }/equipment/toManagePage/${exLab.mainframeId}/${exLab.labId}" onclick="Hui_admin_tab(this);">设备管理</span>
			</shiro:hasPermission>
			</c:if>
			<c:if test="${menuParam eq 3 }">
			 <shiro:hasPermission name="实验室设备管理(个人) or 实验室设备管理(所有) or 实验室设备管理(院系)">
				<span class="btn btn-warning radius pdl-15 pdr-15" data-title="${exLab.labName}实验室设备管理" data-href="${ctx }/equipment/toManagePage/${exLab.mainframeId}/${exLab.labId}" onclick="Hui_admin_tab(this);">设备管理</span>
			</shiro:hasPermission>
			</c:if>
			
				<span class="btn btn-success radius pdl-15 pdr-15" data-title="${exLab.labName}实验室使用统计" data-href="${ctx }/experimentLabStatisticsWebController/lab_used_count/${exLab.labId}/${exLab.labName}/${ menuParam}" onclick="Hui_admin_tab(this);">查看使用统计</span>
				<a class="btn btn-primary radius pdl-15 pdr-15" href="${ctx}/page/class_brand/index?labId=${exLab.labId}" target="_blank">查看实验室班牌</a>
			</div>
		</div>
		<div class="part2 row clearfix box-shadow">
			<div class="col-lg-3 col-sm-3">
				<p class="lab_environment text-c c-red"><i class="experimentFont experimentFont-temperature"></i><span class="env-content"><span class="evn-num">30℃</span><span class="env-name">室温</span></span></p>
			</div>
			<div class="col-lg-3 col-sm-3">
				<p class="lab_environment text-c c-primary"><i class="experimentFont experimentFont-wet"></i><span class="env-content"><span class="evn-num">60%</span><span class="env-name">湿度</span></span></p>
			</div>
			<div class="col-lg-3 col-sm-3">
				<p class="lab_environment text-c c-orange"><i class="experimentFont experimentFont-light"></i><span class="env-content"><span class="evn-num">适中</span><span class="env-name">光照</span></span></p>
			</div>
			<div class="col-lg-3 col-sm-3">
				<p class="lab_environment text-c c-success"><i class="experimentFont experimentFont-air"></i><span class="env-content"><span class="evn-num">空气清新</span><span class="env-name">空气质量</span></span></p>
			</div>
		</div>
		<div class="part5 row clearfix box-shadow mb-10">
			<ul class="col-lg-12 inductorList clearfix">
				<c:forEach items="${equ_9 }"  var="temp9">
					<c:if test='${temp9.epType eq "03" ||  temp9.epType eq "02"}'>
						<li class="col-lg-2 col-sm-3 col-xs-6 text-c on" id="${temp9.devId }_${temp9.ep}">
							<div class="box-shadow radius">
								<p><i class="experimentFont experimentFont-ziyuan4"></i></p>
								<p><span>${temp9.epName }</span></p>
							</div>
						</li>
					</c:if>
				</c:forEach>
			</ul>
		</div>
		<div class="part3 box-shadow radius row clearfix pd-15 mb-10">
			<div class="part3-1 row clearfix mb-10 col-lg-12">
				<ul class="controlList clearfix">
					<li class="col-lg-3 col-sm-3 col-xs-6 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-chazuo"></i></p>
							<p><span>插座</span></p>
						</div>
					</li>
					<li class="col-lg-3 col-sm-3 col-xs-6 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-el-icon-men"></i></p>
							<p><span>门</span></p>
						</div>
					</li>
					<li class="col-lg-3 col-sm-3 col-xs-6 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-dengpao"></i></p>
							<p><span>灯控</span></p>
						</div>
					</li>
					<li class="col-lg-3 col-sm-3 col-xs-6 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-hongwaizhuanfa"></i></p>
							<p><span>红外</span></p>
						</div>
					</li>
					<li class="col-lg-3 col-sm-3 col-xs-6 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-chuanglian"></i></p>
							<p><span>窗帘</span></p>
						</div>
					</li>
					<li class="col-lg-3 col-sm-3 col-xs-6 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-camera"></i></p>
							<p><span>摄像头</span></p>
						</div>
					</li>
					<li class="col-lg-3 col-sm-3 col-xs-6 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-reboot"></i></p>
							<p><span>电源总开关</span></p>
						</div>
					</li>
					<li class="col-lg-3 col-sm-3 text-c">
						<div class="box-shadow radius">
							<p><i class="experimentFont experimentFont-warning"></i></p>
							<p><span>报警设备</span></p>
						</div>
					</li>
				</ul>
			</div>
			<div class="part3-2 row clearfix col-lg-12">
				<div class="clearfix">
					<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_4 }" var="temp4">
							<li class="col-lg-3 col-sm-3 col-xs-6 text-c on" equipmentId="${temp4.devId }_${temp4.ep}" id="${temp4.devId }_${temp4.ep}">
								<div class="box-shadow radius bk-gray">
									<p><i class="experimentFont experimentFont-chazuo"></i></p>
									<p><span>${temp4.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
					<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_7 }" var="temp7">
							<li class="col-lg-3 col-sm-3 col-xs-6 text-c door" equipmentId="${temp7.devId }_${temp7.ep}" id="${temp7.devId }_${temp7.ep}">
								<div class="box-shadow radius bk-gray">
									<p><i class="experimentFont experimentFont-el-icon-men"></i></p>
									<p><span>${temp7.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
					<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_1 }" var="temp1">
							<li class="col-lg-3 col-sm-3 col-xs-6 text-c" equipmentId="${temp1.devId }_${temp1.ep}" id="${temp1.devId }_${temp1.ep}">
								<div class="box-shadow radius bk-gray">
									<p><i class="experimentFont experimentFont-dengpao"></i></p>
									<p><span>${temp1.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
					<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_2 }" var="temp2">
							<li class="col-lg-3 col-sm-3 col-xs-6 text-c" equipmentId="${temp2.devId }_${temp2.ep}" id="${temp2.devId }_${temp2.ep}">
								<div class="box-shadow radius">
									<p><i class="experimentFont experimentFont-hongwaizhuanfa"></i></p>
									<p><span>${temp2.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
					<!-- <ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<li class="col-lg-3 col-sm-3 col-xs-6 text-c" equipmentId="5">
							<div class="box-shadow radius">
								<p><i class="experimentFont experimentFont-yanwu"></i></p>
								<p><span>烟雾1</span></p>
							</div>
						</li>
					</ul> -->
					<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_6 }" var="temp6">
							<li class="col-lg-3 col-sm-3 col-xs-6 text-c" equipmentId="${temp6.devId }_${temp6.ep}" id="${temp6.devId }_${temp6.ep}">
								<div class="box-shadow radius">
									<p><i class="experimentFont experimentFont-chuanglian"></i></p>
									<p><span>${temp6.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
					<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_5 }" var="temp5">
							<li class="col-lg-3 col-sm-3 col-xs-6 text-c" equipmentId="${temp5.devId }_${temp5.ep}" id="${temp5.devId }_${temp5.ep}">
								<div class="box-shadow radius">
									<p><i class="experimentFont experimentFont-camera"></i></p>
									<p><span>${temp5.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
					<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_8 }" var="temp8">
							<li class="col-lg-3 col-sm-3 col-xs-6 text-c" equipmentId="${temp8.devId }_${temp8.ep}" id="${temp8.devId }_${temp8.ep}">
								<div class="box-shadow radius">
									<p><i class="experimentFont experimentFont-reboot"></i></p>
									<p><span>${temp8.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
					
						<ul class="equipmentList col-lg-12 clearfix bk-gray bg-1 pd-15">
						<c:forEach items="${equ_10 }" var="temp10">
							<li class="col-lg-3 col-sm-3 text-c" equipmentId="${temp10.devId }_${temp10.ep}" id="${temp10.devId }_${temp10.ep}">
								<div class="box-shadow radius">
									<p><i class="experimentFont experimentFont-warning"></i></p>
									<p><span>${temp10.epName }</span></p>
								</div>
							</li>
						</c:forEach>
					</ul>
				</div>
			</div>
		</div>
		<div class="part4 box-shadow radius row clearfix pd-10">
			<div class="clearfix">
				<p class="seatTotal"><i class="experimentFont experimentFont-diannaozhuo"></i><span>总工位数: ${exLab.labSeat }</span></p>
				<ul class="col-lg-12 seatList clearfix">
					<c:forEach items="${equ_3 }" var="temp3" varStatus="vs">
						<li class="col-lg-2 col-sm-2 col-xs-6 text-c" seatId="${temp3.devId }_${temp3.ep}" id="${temp3.devId }_${temp3.ep}">
							<div class="box-shadow pd-10 radius">
								<p><i class="experimentFont experimentFont-diannaozhuo"></i></p>
								<p><span>工位号: ${vs.index+1 }</span></p>
							</div>
						</li>
					</c:forEach>
					<c:forEach  begin="${equ_3.size()+1}" end="${exLab.labSeat }" var="lanNum">
						<li class="col-lg-2 col-sm-2 col-xs-6 text-c" seatId="">
							<div class="box-shadow pd-10 radius">
								<p><i class="experimentFont experimentFont-diannaozhuo"></i></p>
								<p><span>工位号: ${lanNum }</span></p>
							</div>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
	<script type="text/javascript">
		var WISDOMLAB = '${WISDOMLAB}';
		var gwId = '${exLab.mainframeId}';
		var pwd = '${exLab.mainframeKey}';
		var ctx = '${ctx}';
	</script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/lab_info_manage.js"></script>
</body>
</html>