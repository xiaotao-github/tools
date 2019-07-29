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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/lab_electronicScreen_manage.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验室管理</title>
<body>

	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验室管理
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>
	
	<div class="page-container clearfix">
		<div class="pd-10 bk-gray bg-1">
			<p class="f-20" style="margin-bottom:0;"><span>${experimentLab.labName }</span>--<span>电子班牌公告管理</span></p>
		</div>
		<div class="editbarcl pd-5 bg-1 bk-gray mt-20">
			<a href="javascript:;" onclick="openAddPageMsg('${ctx }/page/admin/lab_manage/addMsg?labId=${experimentLab.labId }','添加实验室公告');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont"></i>添加</a>
		</div>
		<div class="mt-30">
			<table class="table table-border table-bordered table-bg table-sort table-hover msgTable">
				<thead class="text-c">
					<tr>
						<th width="200">标题名称</th>
						<th width="80">发布教师</th>
						<th width="80">创建时间</th>
						<th width="80">更新时间</th>
						<th width="80">是否面向所有实验室</th>
						<th width="40">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
						<c:forEach items="${notices }" var="notice">
						<tr>
							<td class="text-c">${notice.title }</td>					
							<td class="text-c">${notice.teacherName }</td>					
							<td class="text-c">${notice.createTimeToString }</td>					
							<td class="text-c">${notice.updateTimeToString }</td>					
							<td class="text-c" msgId="${notice.noticeId }">
							<c:choose>
								<c:when test="${notice.isCommon == 0 }">
									<span class="btn btn-primary radius pl-5 pr-5" onclick="changeMsgBoundary(this);" isOpen="${notice.isCommon }">	否</span>
								</c:when>
								<c:otherwise>
									<span class="btn btn-success radius pl-5 pr-5" onclick="changeMsgBoundary(this);" isOpen="${notice.isCommon }">是</span>
								</c:otherwise>
							</c:choose>
							</td>					
							<td class="text-c" msgId="${notice.noticeId }">
								<a class="msgShow" href="javascript:void(0);" onclick="showMsg(this)" isShow="${notice.isPublish }">
								<c:choose>
									<c:when test="${notice.isPublish ==0 }">
										<i class="c-success experimentFont">&#xe64e;</i>
									</c:when>
									<c:otherwise>
										<i class="c-999 experimentFont">&#xe610;</i>
									</c:otherwise>
								</c:choose>	
								</a>
								<a class="msgEdit" href="javascript:void(0);" onclick="openAddPageMsg('${ctx }/labNoticeController/toEditPage/${notice.noticeId }','编辑实验室公告');"><i class="iconfont icon-bianji"></i></a>
								<a class="msgDel" href="javascript:void(0);" onclick="delMsg(this);"><i class="c-red experimentFont experimentFont-shanchu-copy"></i></a>
							</td>					
						</tr>
						</c:forEach>
				</tbody>
			</table>
		</div>
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
<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/lab_electronicScreen_manage.js"></script>
<script>
	$(function(){
		initMsgTable();
	})
</script>
</body>
</html>