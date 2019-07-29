<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experiment_course_preview.css">
<title>实验预览</title>
<style>
.bg-size{
	font-size:100px;
	color:#cccccc;
}
</style>
</head>
<body>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页
		<span class="c-gray en">&gt;</span>
		实验管理
		<c:if test="${menuParam==1}">
		所有实验
		</c:if>
		<c:if test="${menuParam==2}">
		院系实验
		</c:if>
		<c:if test="${menuParam==3}">
		我的实验
		</c:if> <span class="c-gray en">&gt;</span> 
		实验预览
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</nav>
	<div class="container">
		<p class="text-c">
			<span class="experiment-title pr-10 c-orange">${experiment.experimentName }</span>
			<span>教师:&nbsp; ${experiment.author.name }</span>
		</p>
		<p class="text-c f-12" style="margin:0;">
		    <span class="pr-20">实验课时:&nbsp;${experiment.needHour}(小时)</span>
		     <span class="pr-20">所属课程:${experiment.experimentCourse.courseName}</span>
		     
			<%-- <span class="pr-20">类型:&nbsp; <c:choose><c:when test="${experiment.experimentType ==1}">设计实验</c:when><c:otherwise>参考实验</c:otherwise></c:choose></span> --%>
			<%-- <span class="f-12">状态: </span>
			<c:choose>
				<c:when test="${experiment.openStatus eq 3 }">
					<span style="color:#3bb4f2">完全开放</span>
				</c:when>
				<c:when test="${experiment.openStatus eq 2 }">
					<span style="color:#5eb95e">院系开放</span>
				</c:when>
				<c:otherwise>
					<span style="color:#333;">不开放</span>
				</c:otherwise>
			</c:choose> --%>
			<span class="ml-10 f-12">难度: </span>
			 <c:choose>
				<c:when test="${experiment.level==1 }">
					<span class="f-12 c-green">容易</span>
				</c:when>
				<c:when test="${experiment.level==2 }">
					<span class="f-12 c-orange">适中</span>
				</c:when>
				<c:when test="${experiment.level==3 }">
					<span class="f-12 c-red">困难</span>
				</c:when>
			</c:choose> 
		</p>
		<div>
			<p><span class="tipTitle pl-10 f-16">实验介绍：</span></p>
			<div class="pl-20 pr-20" style="width:95%;height:40%;overflow:hidden">${experiment.experimentPresentation}</div>
			<!-- 编辑器里面的图片 -->
		</div>
		<div class="resouresPart cl mb-20">
			<p><span class="tipTitle pl-10 f-16">实验资源: </span></p>
			<div class="cl" style="width:770px;margin:0 auto;">
				<ul class="resourceChangeNav c-white clearfix">
					<!-- <li class="checked"><span>实验指导书</span></li> -->
					<li class="checked"><span>视频</span></li>
					<li><span>文档</span></li>
					<li><span>图片</span></li>
					<li><span>其他</span></li>
				</ul>
				<div class="resourceBox">
					<!-- <div class="resourceChangeBox instructorResoure checked">
						<dl>
							<dt><span></span></dt>
							<dd class="instructor">
								<div id="instructor"></div>
							</dd>
						</dl>
					</div> -->
					<div class="videoBox resourceChangeBox checked">
						<ul class="videoResourceShowPart">
							
						</ul>
						<ul class="videoResourceNav cl">
						</ul>
					</div>
					<div class="docBox resourceChangeBox">
						<ul class="docResourceShow">
							
						</ul>
						<ul class="docResourceNav cl">
							
						</ul>
					</div>
					<div class="imgBox resourceChangeBox">
						<div class="showPic">
							<img src="" alt="" />
						</div>
						<div style="position:relative">
							<div style="overflow:hidden;width:640px;margin: 10px auto;">
								<ul class="imgResourceNav cl">
									
								</ul>
							</div>
							<div class="imgDetailPrevBtn imgDetailBtn">
								<p></p>
							</div>
							<div class="imgDetailNextBtn imgDetailBtn">
								<p></p>
							</div>
						</div>
					</div>
					<div class="otherBox resourceChangeBox">
						<ul class="otherResourcePart" style="padding:10px 15px;">
						</ul>
					</div>
				</div>
			</div>
		</div>
	<%-- 	<div>
			<p><span class="tipTitle pl-10 f-16">拓展实验: </span></p>
			<p class="pl-20 pr-20">${experiment.expandContext}</p>
		</div> --%>
		<%-- <div>
			<p style="position:relative;"><span class="tipTitle pl-10 f-16">实验报告模板：</span><span class="f-12 c-red" style="position:absolute;right:10px;top:5px;CURSOR:pointer;"onclick="experiment_add_muban('编辑实验报告模板','${ctx }/experimentController/selectExperimentToMubanPage/${experiment.experimentId }')">[<i class="pr-5"></i>编辑模板]</span></p>
			<div style="background:#f0f0f0; border:1px solid #ddd;margin:20px;padding:20px 30px;/* height:400px;overflow:auto; */" class="testCtrPart">
				${experiment.experimentInstructor }
			</div>
		</div> --%>
	<%-- 	<div>
			<p><span class="tipTitle pl-10 f-16">标准答案：</span></p>
			<c:choose>
				<c:when test="${empty experiment.solution }">
					<p class="pl-20 pr-20"><span class="downloadBtn">该实验下暂未分配标准答案</span></p>
				</c:when>		
				<c:otherwise>
					<p class="pl-20 pr-20"><span class="downloadBtn" onclick="downloadFile(${experiment.solution.fileId})"><i class="Hui-iconfont">&#xe640;</i>下载标准答案</span></p>
				</c:otherwise>
			</c:choose>
		</div> --%>
	</div>
	<%-- <c:forEach items="${experiment.fileList }" var="file">
		资源名称：${file.fileName}<br/>
		资源标题：${file.fileTitle }<br/>
		资源类型：${file.fileType }<br/>
		资源预览路径：${file.fileFormatPath }<br/>
	</c:forEach> --%>


<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/ckplayer/ckplayer.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/staticfile/lib/flexpaper/flexpaper_flash.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/lib/flexpaper/flexpaper_flash_debug.js"></script>
<script>
	var realPath = '${ctx }';
	var RESOURCE_WAY = '${RESOURCE_WAY}';
	//var experimentInstructorFileFormatPath='${experiment.instructor.fileFormatPath}';
	//var experimentInstructorFilePath='${experiment.instructor.filePath}';
	var	others = '${experiment.fileMap.othersPath }',
		swf = '${experiment.fileMap.swfPath }',
		img = '${experiment.fileMap.imgPath }',
		flv = '${experiment.fileMap.flvPath }'; 
		
		
		//添加实验报告模板
		function experiment_add_muban(title,url){
			var index = layer.open({
				type: 2,
				title: title,
				content: url,
				area: ['600px','450px'],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
			layer.full(index);
		}
		//下载文件
		function downloadFile(objId){
			var form = $("<form>");   //定义一个form表单
		    form.attr('style', 'display:none');   //在form表单中添加查询参数
		    form.attr('method', 'post');
		    form.attr('action', '${RESOURCE_URL}/fileController/downloadFile2/'+objId);
		    $('body').append(form);  //将表单放置在web中
		    form.submit();
		}
</script>
<script type="text/javascript" src="${ctx}/staticfile/js/experiment_course_preview.js"></script>
<!--请在下方写此页面业务相关的脚本-->

</body>
</html>