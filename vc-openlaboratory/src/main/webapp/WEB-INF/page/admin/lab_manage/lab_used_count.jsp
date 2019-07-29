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
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/lab_used_count.css">
	<!--[if IE 6]>
	<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
	<script>DD_belatedPNG.fix('*');</script>
	<![endif]-->
	<title>实验室管理</title>
</head>
<body>
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		${labName }>实验室使用率统计
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
		<input type="hidden" name="labId" value = "${labIds}"/>
	</div>
	<div class="container-page clearfix">
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
					<%-- <li class="col-lg-4 col-sm-4 bg-1 pd-20">
						<div class="text">
							<p class="name">小组协作</p>
							<p class="time">共<span>${groupTime }</span>个小时</p>
						</div>
						<div class="circle bg-orange"><span>${groupCount }次</span></div>
					</li> --%>
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
		<div class="pd-5 bg-1 bk-gray mt-20 ml-20 mr-20 clearfix">
		<c:if test="${countCourse gt 0}">
		<form action="${ctx }/experimentLabStatisticsWebController/exportLabdata/${labId}"  method="post" class="f-r pl-5 myAllScheduleForm">
			<div title="导出" class="btn radius btn-primary" onclick="putOutSchedule(0);">导出所有课表<i class="Hui-iconfont"></i></div>
		</form>
		</c:if>
		
		<c:if test="${thCountCourse gt 0}">
		<form action="${ctx }/experimentLabStatisticsWebController/exportMyLabdata/${labId}/${teacherInfo.id }"  method="post" class="f-r myScheduleForm">
			<div title="导出" class="btn radius btn-primary" onclick="putOutSchedule(1);">导出我的课表<i class="Hui-iconfont"></i></div>
		</form>
		</c:if>
		</div>
		
		<div class="bottomPart pd-20 clearfix">
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
					
					<c:if test="${list.teacherInfo.id eq teacherInfo.id }">
					
					<td class="text-c"data-title="${list.tbClassList.get(0).name}" data-href="${ ctx}/courseScheduleController/toScheduleDetailPage/${list.scheduleId }/${menuParam}" onclick="Hui_admin_tab(this);"><a>${list.tbClassList.get(0).name}:(${list.tbClassList.get(0).memberNum})人</a></td>
					
					</c:if >
					
					<c:if test="${list.teacherInfo.id ne teacherInfo.id }">
					
					<td class="text-c"data-title="${list.tbClassList.get(0).name}" data-href="" onclick="layer.msg('该课程不属于你，不能进行操作！')"><a>${list.tbClassList.get(0).name}:(${list.tbClassList.get(0).memberNum})人</a></td>
				
					</c:if>
				
				
				
				
				<%-- 	<c:choose>
					<c:when test="${menuParam ==1 }">
						<td class="text-c"data-title="${list.tbClassList.get(0).name}" data-href="${ ctx}/courseScheduleController/toScheduleDetailPage/${list.scheduleId }/${menuParam}" onclick="Hui_admin_tab(this);"><a>${list.tbClassList.get(0).name}:(${list.tbClassList.get(0).memberNum})人</a></td>
					</c:when>
					<c:when test="${menuParam ==2 }">
						<td class="text-c"data-title="${list.tbClassList.get(0).name}" data-href="${ ctx}/courseScheduleController/toScheduleDetailPage/${list.scheduleId }/${menuParam}" onclick="Hui_admin_tab(this);"><a>${list.tbClassList.get(0).name}:(${list.tbClassList.get(0).memberNum})人</a></td>
					</c:when>
					<c:otherwise>	
						<td class="text-c"data-title="${list.tbClassList.get(0).name}" >${list.tbClassList.get(0).name}:(${list.tbClassList.get(0).memberNum})人</td>
					</c:otherwise>
					</c:choose> --%>
			
					</tr>
				</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
	
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/hcharts/Highcharts/5.0.6/js/highcharts.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script>
var ctx = "${ctx}";
</script>
<script type="text/javascript">

var wholeClassCountThan = '${wholeClassCountThan}'/1,
	groupCountThan = '${groupCountThan}'/1,
	privateCountThan = '${privateCountThan}'/1;
var chartData = {
		"chart1": [
			{"name":"整班上课","y":wholeClassCountThan},
			/* {"name":"小组协作","y":groupCountThan}, */
			{"name":"自主预约","y":privateCountThan}
		]
	}
	
	
</script>
<script type="text/javascript" src="${ctx }/staticfile/js/lab_used_count.js"></script>
</body>
</html>