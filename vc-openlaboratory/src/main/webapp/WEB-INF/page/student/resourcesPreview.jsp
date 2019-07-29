<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/experiment_font/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/experiment_font/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/reset.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/public.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/footer.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/resourcesPreview.css">
</head>
<body>
	<div class="breadcrumb">
		<div class="inner clearfix">
			<i class="Hui-iconfont">&#xe67f;</i>系统首页<i class="c-gray en">&gt;</i>>资源预览
			<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px;color:#fff;" href="javascript:location.replace(location.href);" title="刷新">
				<i class="iconfont icon-shuaxin"></i>
			</a>
		</div>
	</div>

	<div class="resourcesPreviewContainer">
		<div class="inner clearfix boxBorder box-shadow" style="background: rgba(255,255,255,0.5);">
			<div class="head">
				<p class="pl-20 pt-10 pb-10">
					<span class="pl-20 f-24 fw-bold fc-objGreen resourceName">这里是该资源的名称</span>
					<!-- <span class="f-16 fw-bold pl-5 c-orange">[资源类型: 标准答案]</span> -->
				</p>
			</div>
			<div class="clearfix pd-20">
				<div class="leftPart f-l">
					<div class="resourceBox boxBorder bc-white box-shadow"></div>
					<div class="clearfix pd-10">
						<p class="f-l f-12 c-999"><span>资源上传时间: </span><span class="createTime">2018-01-03 11:26</span></p>
						<p class="f-r f-12 c-999"><span>资源作者: </span><span class="resourceAuthor">王大鹅</span></p>
						<!-- <p class="f-r f-12 c-999 pr-20"><span>浏览量: </span><span>123456</span></p> -->
					</div>
					<div class="resourceText pt-10">
						<p class="fc-objBlue fw-bold">介绍: </p>
						<p class="pl-20 filePresentation"><%-- ${previewList.resourceFileList.get(0).filePresentation } --%></p>
					</div>
				</div>
				<div class="rightPart f-l bc-white boxBorder box-shadow">
					<div class="pd-20">
						<p class="mb-10">
							<span class="s1 f-l fc-objBlue"><i class="iconfont f-14 pr-5 ">&#xe66f;</i>所属实验: </span>
							<span class="s2 c-999 experimentName"><%-- ${previewList.experimentList.experimentName } --%></span>
						</p>
						<p class="mb-10">
							<span class="s1 f-l fc-objBlue"><i class="iconfont f-14 pr-5">&#xe64b;</i>实验指导老师: </span>
							<span class="s2 c-999 author"><%-- ${previewList.experimentList.author.name } --%></span>
						</p>
						<p class="mb-10">
							<span class="s1 f-l fc-objBlue"><i class="iconfont f-14 pr-5">&#xe61d;</i>资源格式:</span>
							<span class="s2 c-999 resourceType"><%-- ${previewList.resourceFileList.get(0).fileType } --%></span>
						</p>
						<div class="resourceDownload mr-20 pt-20">
						<%-- <p class="text-c"><a  href="${ RESOURCE_WAY}${previewList.resourceFileList.get(0).filePath }" class="f-18 pd-5 pl-20 pr-20 radius btn btn-warning" style="cursor: pointer;">下载资源</a></p> --%>
						 <p id="isDownload" class="text-c"><span class="f-18 pd-5 pl-20 pr-20 radius btn btn-warning" onclick="downLoad(${resourcefileId})" style="cursor: pointer;" >下载资源</span></p> 
							<p class="text-c f-12 c-999 mt-5"><span>下载量: </span><span class="downloadNum"><%-- ${previewList.resourceFileList.get(0).downloadNum } --%></span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<form action="${ctx }/studentController/downLoad" method="get" id="downLoadFile">
		<input type="hidden" name="fileId" value="" id="fileId"/>
	</form>
	
	<%@include file="../footer.jsp"%>

</body>
<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/ckplayer/ckplayer.js" charset="utf-8"></script>

<script type="text/javascript">
	var ctx = '${ctx}';
	var resourcefileId = "${resourcefileId}";
	var experimentId = "${experimentId}";
	var resource_way = '${RESOURCE_WAYRESOURCE_WAYRESOURCE_WAY}';
	var srcUrl= '${RESOURCE_WAY}';
	//var resource_share = [[${session.RESOURCE_URL}]];
</script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/resourcesPreview.js"></script>

</html>