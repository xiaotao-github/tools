<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta http-equipv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
	<meta http-equipv="Cache-Control" content="no-siteapp" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/reset.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/public.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/hui_table.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/experimen-newFont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/style.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/common.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/dataTable-experiment-skin.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/lab_used_count.css">
	<title>${labName }实验室统计率</title>
</head>
<body>

<div class="container-page">
		<div class="topPart clearfix row mr-20 ml-20">
			<div class="leftPart f-l col-lg-7 col-sm-7 col-xs-12">
				<div class="chart mt-20" id="chart1">
				</div>
			</div>
			<div class="rightPart f-l col-lg-5 col-sm-5 col-xs-12">
				<ul class="clearfix text-c mt-25 box-shadow">
					<li class="col-lg-6 col-sm-6 col-xs-6 bg-gray pd-20">
						<div class="circle bg-blue"><span>${wholeClassCount}次</span></div>
						<div class="text">
							<p class="time">共<span>${wholeClassTime }</span>个小时</p>
							<p class="name">整班上课</p>
						</div>
					</li>
					<li class="col-lg-6 col-sm-6 col-xs-6 bg-1 pd-20">
						<div class="text">
							<p class="name">自主预约</p>
							<p class="time">共<span>${privateTime}</span>个小时</p>
						</div>
						<div class="circle bg-green"><span>${privateCount}次</span></div>
					</li>
				</ul>
			</div>
		</div>
	<%-- 	<form action="${ctx }/experimentLabStatisticsWebController/exportLabdata/${labId}"  method="post">
		<div class="pd-5 bg-1 bk-gray mt-20 ml-20 mr-20 text-r">
			<button type="submit" title="导出" class="btn radius btn-primary">导出表格<i class="Hui-iconfont"></i></button>
		</div>
		</form> --%>
		<div class="bottomPart pd-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead class="text-c">
					<tr>
						<th width="">实验室使用类型</th>
						<th width="">上课教师</th>
						<th width="">上课内容</th>
						<th width="">上课时间</th>
						<th width="">使用时长</th>
						<th width="">使用对象</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${Laboratorylist}" var = "list">
					<tr>
					<c:if test="${list.type == 1 }">
						<td class="text-c">整班上课</td>
					</c:if>
					<c:if test="${list.type == 2 }">
						<td class="text-c">小组协作</td>
					</c:if>
					<c:if test="${list.type == 3 }">
						<td class="text-c">自主预约</td>
					</c:if>
					<c:if test="${list.type == 4 }">
						<td class="text-c">私人日程</td>
					</c:if>
						<td class="text-c">${list.teacherInfo.name}</td>
						<td class="text-c">${list.experimentCourse.courseName }</td>
					<td class="text-c"> 
					 <p><fmt:formatDate value="${list.schooltime}" pattern="yyyy-MM-dd"/> : ${list.slice} : ${list.sliceByte}</p>
					</td>
					<td class="text-c">${classTime }时</td>
					<td class="text-c"data-title="${list.tbClassList.get(0).name}" >${list.tbClassList.get(0).name}:(${list.tbClassList.get(0).memberNum})人</td>
			
					</tr>
				</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="body_shadow pos-f"></div>

	<div class="jump_btn pos-f">
		<ul class="mb-0">
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">情景模式</p>
				<a href="${ctx }/miniLab/getPage/${lab.labId}"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_equipmentControl.png" alt=""></a>
			</li>
			
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">设备控制</p>
				<a href="${ctx }/miniLab/labInfo/${lab.mainframeId }/${lab.labId}/3"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_equipmentControl.png" alt=""></a>
			</li>
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">设备管理</p>
				<a href="${ctx }/miniLab/toManagePage/${lab.mainframeId }/${lab.labId}"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_equipmentManage.png" alt=""></a>
			</li>
			<li>
				<p class="jump_btn_tip pt-5 pd-5 text-c c-white f-12 mt-25">智慧实验室</p>
				<a href="${ctx }/miniLab/list" class="pos-r"><img src="${ctx }/staticfile/minilab/images/lab_mobile_jump_btn_count.png" alt=""></a>
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


	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/layer/2.4/layer.js"></script>
	
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/hcharts/Highcharts/5.0.6/js/highcharts.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script>
	var ctx = "${ctx}";
	var labName="${labName}";
	var wholeClassCountThan = 123/1,
		groupCountThan = '${groupCountThan}'/1,
		privateCountThan = 45/1;
	var chartData = {
			"chart1": [
				{"name":"整班上课","y":wholeClassCountThan},
				{"name":"自主预约","y":privateCountThan}
			]
		}
	</script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/lab_used_count.js"></script>
</body>

</html>