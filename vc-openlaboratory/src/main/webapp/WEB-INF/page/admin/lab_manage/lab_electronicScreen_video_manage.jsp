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
		实验室管理>电子班牌视频管理
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>
	<div class="page-container clearfix">
		<div class="pd-10 bk-gray bg-1">
			<p class="f-20" style="margin-bottom:0;"><span>${exLab.labName }</span>--<span>电子班牌视频管理</span></p>
		</div>
		<div class="editbarcl pd-5 bg-1 bk-gray mt-20">
			<a href="javascript:;" onclick="openAddPage('${ctx }/labClassCardWebVideoController/uploadVideo','添加视频',${labId});" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont"></i>添加</a>
			<div class="activeBtnBox f-r">
				<div sign="${pvStatus.pvStatus}" onclick="screen_center_play(this,${labId},${pvStatus.pvStatus});" class="activeBtn">
					<div class="line"></div>
					<div class="circle"></div>
				</div>
				<span class="span">默认轮播图轮播<i class="Hui-iconfont Hui-iconfont-help c-red" onclick="openMsg();"></i></span>
				<p class="span_msg pd-20"><span><i class="Hui-iconfont Hui-iconfont-help c-red"></i>主要播放方式分为:①轮播图轮播; 若均不设置则默认轮播图轮播  ②视频播放; </span></p>
			</div>
		</div>
		<div class="mt-30">
			<table class="table table-border table-bordered table-bg table-sort table-hover videoTable">
				<thead class="text-c">
					<tr>
						<th width="20">标题名称</th>
						<!-- <th width="35">文件名称</th> -->
						<th width="75">描述</th>				
						<th width="5">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<%-- <c:if test="${empty  page.list }"> <div class="Hui-tags-has"><p style="text-align:center;color:red; font-size:30px "  >请先上传视频！</p> </div></c:if> --%>
					<c:forEach items="${page}" var="page">
					<tr>
						<td class="text-c">${page.title}</td>					
						<%-- <td>${page.filePath }</td>	 --%>				
						<td class="text-c">${ page.pvDescribe}</td>			
						<td   class="text-c" videoId="${ page.pvId}">
							<a class="videoPlay" href="javascript:void(0);" onclick="selVideo(this)" isPlay="${page.isPublish} " labid="${labId}">
								<c:choose>
									<c:when test="${page.isPublish ==0 }">
										<i class="c-success experimentFont">&#xe64e;</i>
									</c:when>
									<c:otherwise>
										<i class="c-999 experimentFont">&#xe610;</i>
									</c:otherwise>
								</c:choose>	
							</a>
							<!-- <a class="videoPlay" href="javascript:void(0);" onclick="selVideo(this)" isPlay="0"><i class="c-999 experimentFont">&#xe610;</i></a> -->
							<a class="videoEdit" href="javascript:void(0);" onclick="openUpdateVideo('${ctx }/labClassCardWebVideoController/editVideo','编辑视频','${page.pvId}');"><i class="iconfont icon-bianji"></i></a>
							<a class="videoDel" href="javascript:void(0);" onclick="delVideo(this);"><i class="c-red experimentFont experimentFont-shanchu-copy"></i></a>
						</td>					
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
	<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/lab_electronicScreen_manage.js"></script>
	<script type="text/javascript">
			var ctx = '${ctx}';
	</script>
	<script>
		$(function(){
			initVideoTable();
		})
	</script>
</body>
</html>