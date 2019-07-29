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
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
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
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验管理</title>
<script type="text/javascript"
	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>

</head>
<body>

	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验管理 <span class="c-gray en">&gt;</span>课程实验
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<!-- 	<div class="text-c">
		<div class="searchbar">
			<input type="text" class="input-text f-14" style="width:250px"><input type="button" class="btn btn-primary" value="搜索">
		</div>
	</div> -->
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="80">课程名称</th>
						<th width="80">实验名称</th>
						<th width="50">标识</th>
						<th width="60">实验类型</th>
					    <th width="150">实验介绍</th>
						<th width="60">难易程度</th>
						<th width="30">课时</th>
						<th width="100">修改时间</th>
						<th width="30">作者</th>
						<th width="50">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${experimentCourseList }" var="experimentCourse">
						<c:forEach items="${experimentCourse.experimentList }" var="experiment">
							<tr class="text-c">
								<td class="text-c">${experimentCourse.courseName }</td>
								<td class="text-c">${experiment.experimentName }</td>
								<td class="text-c">${experiment.keyword}</td>
								<td class="text-c">
									 <c:choose>
										<c:when test="${experiment.experimentType==1 }">设计实验</c:when>
										<c:otherwise>参考实验</c:otherwise>
									</c:choose> 
								</td>
							    <td class="text-c">
							    <c:choose>
							    	<c:when test="${fn:length(experiment.experimentPresentation)<60 }">
							    	${experiment.experimentPresentation }
							    	</c:when>
							    	<c:otherwise>${fn:substring(experiment.experimentPresentation,0,60) }...</c:otherwise>
							    </c:choose>
							    </td>
								 <c:choose>
									<c:when test="${experiment.level==1 }">
										<td class="text-c">容易</td>
									</c:when>
									<c:when test="${experiment.level==2 }">
										<td class="text-c">适中</td>
									</c:when>
									<c:when test="${experiment.level==3 }">
										<td class="text-c">困难</td>
									</c:when>
								</c:choose> 
								
								<td class="text-c">${experiment.needHour }</td>							
								<td class="text-c">
								<fmt:formatDate value="${experiment.updateTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
								</td>
								<td class="text-c">${experiment.author.name}</td>
								<td class="text-c">
								<c:if test="${experiment.experimentType==1 }">
									<a onclick="experiment_arrange('安排实验','${ctx}/experimentGroupController/toPlanExperimentPage/${experimentCourse.experimentCourseId }/${experiment.experimentId }')" title="实验分配"><i class="experimentFont">&#xe600;</i></a>
								</c:if>
								<a	style="text-decoration: none;" onclick="experiment_preview('预览','${ctx }/experimentController/selectExperimentToPreviewPage/${experiment.experimentId }')" title="预览"><i class="experimentFont">&#xe64e;</i></a>
								</td>
							</tr>
						</c:forEach>
					</c:forEach>

				</tbody>
			</table>
		</div>
	</div>


	<!--_footer 作为公共模版分离出去-->
		<%@include file="../../footer.jsp" %>
<script type="text/javascript"
	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript"
	src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>

<script type="text/javascript"
	src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript"
	src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/laypage/1.2/laypage.js"></script>
<script type="text/javascript">
$('.table-sort').dataTable({
	"aaSorting": [[ 7, "desc" ]],//默认第几个排序
	"bStateSave": true,//状态保存
	"aoColumnDefs": [
	  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
	  {"orderable":false,"aTargets":[4,9]}// 制定列不参与排序
	]
});
//实验预览
function experiment_preview(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url,
		area: ['550px','600px'],
		maxmin:true,
		scrollbar: false,
		resize: true
	});
	layer.full(index);
}
//分配实验
function experiment_arrange(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url,
		area: ['550px','600px'],
		maxmin:true,
		scrollbar: false,
		resize: true
	});
	layer.full(index);
}
	
	
	
	
</script>
</body>
</html>