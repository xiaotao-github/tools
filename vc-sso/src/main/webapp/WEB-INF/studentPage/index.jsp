<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>欢迎来到虚拟仿真实验教学平台</title>
    <link href="${ctx }/staticfile/css/student_index.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx }/staticfile/font-awesome-4.7.0/css/font-awesome.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/myselfInfoRevise.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/passwordRevise.css">
    <link href="${ctx }/staticfile/css/student_index.css" rel="stylesheet">
    <link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
	<style type="text/css">
		.hide_Validform{
			display: none !important;
		}
	</style>
	<script type="text/javascript">
		//防止页面后退
		history.pushState(null, null, document.URL);
		window.addEventListener('popstate', function () {
		        history.pushState(null, null, document.URL);
		});
	</script>
</head>
<body>
<jsp:include page="./header.jsp"></jsp:include>
	<div class="core clear">
	    <div class="content">
	        <p class="title">平台功能</p>
	        <p class="subtitle">这里有满足您所有学习的一切需求</p>
	        <ul class="clearfix">
	            <li>
	                <a href="${cookie.CLASSROOM_URL.value}/page/web/index" class="icon"><img id="core-1" src="${ctx }/staticfile/images/student/learn-2.png"></a>
	                <a href="${cookie.CLASSROOM_URL.value}/page/web/index" class="corename">教学中心</a>
	                <p class="coreintroduce">学生的“课前”，“课中”，“课后”有机结合的网络在线学习。</p>
	            </li>
	            <%-- <li>
	                <a href="${ctx }/studentPage/experiment_welcome" class="icon"><img id="core-2" src="${ctx }/staticfile/images/student/experiment-2.png"></a>
	                <a href="${ctx }/studentPage/experiment_welcome" class="corename">实验中心</a>
	                <p class="coreintroduce">真正意义上的开放实验室，实现理论教学和实践教学的有机融合。</p>
	            </li> --%>
	            <li>
	                <a href="${cookie.VS_EXPERIMENT.value }/page/web/index?identify=1" class="icon"><img id="core-2" src="${ctx }/staticfile/images/student/experiment-2.png"></a>
	                <a href="${cookie.VS_EXPERIMENT.value }/page/web/index?identify=1" class="corename">实验中心</a>
	                <p class="coreintroduce">真正意义上的开放实验室，实现理论教学和实践教学的有机融合。</p>
	            </li>
	            <li>
	                <a href="${TEACHER_SPACE_URL}/page/web/index" class="icon"><img id="core-5" src="${ctx }/staticfile/images/student/stucoo-2.png"></a>
	                <a href="${TEACHER_SPACE_URL}/page/web/index" class="corename">协同学习</a>
	                <p class="coreintroduce">主要基于协同学习模式组织学生学习，学生可以创建学习共同体，采用六步法开展教学。</p>
	            </li>
	           <%--  <li>
	                <a href="javascript:void(0);" class="icon"><img id="core-3" src="${ctx }/staticfile/images/student/training-3.png"></a>
	                <a href="javascript:void(0);" class="corename" style="color:#b0b0b0;">实训中心</a>
	                <p class="coreintroduce" style="color:#b0b0b0;">实训中心实训中心实训中心实训中心</p>
	            </li> --%>
	            <%-- <li>
	                <a href="" class="icon"><img id="core-3" src="${ctx }/staticfile/images/student/amplifier-2.png"></a>
	                <a href="" class="corename">差分放大器示范实验</a>
	                <p class="coreintroduce">差分放大器是能把两个输入电压的差值加以放大的电路。</p>
	            </li> --%>
	            <%-- <li>
	                <a href="${RESOURCE_URL}/student/main" class="icon"><img id="core-5" src="${ctx }/staticfile/images/student/res-2.png"></a>
	                <a href="${RESOURCE_URL}/student/main" class="corename">资源中心</a>
	                <p class="coreintroduce">提供强大的管理功能和大量的学习辅助资源，为学生在自主学习中提供有力辅导。</p>
	            </li> --%>
	            <li>
	                <a href="${EXAM_URL }/exam3/talk/ExaminationList.jspx" class="icon" target="_target"><img id="core-3" src="${ctx }/staticfile/images/student/test-2.png"></a>
	                <a href="${EXAM_URL }/exam3/talk/ExaminationList.jspx" class="corename" target="_target">考试中心</a>
	                <p class="coreintroduce">支持综合考试、单元练习，错题解析，错题组卷反复练习等功能。</p>
	            </li>
	            <li>
	                <a href="${DISCUSSION_URL}/page/studentInfo/index" class="icon"><img id="core-4" src="${ctx }/staticfile/images/student/communicate-1.png"></a>
	                <a href="${DISCUSSION_URL}/page/studentInfo/index" class="corename">交流中心</a>
	                <p class="coreintroduce">学习问答的知识社区，促进学生之间的学习交流和互动。</p>
	            </li>
	        </ul>
	    </div>
	</div>
	<div style="clear: both"></div>
	<div class="picture clear">
	    <div class="content">
	        <p class="title">一流，实用的教学，实验，考试管理平台</p>
	        <p class="subtitle">教学不再传统，学习不再乏味</p>
	        <ul class="clear">
	            <li class="resource">
	                <a href="${RESOURCE_URL}/student/main"><img class="icon" src="${ctx }/staticfile/images/student/resource-1.png"></a>
	                <div class="fonts">
	                    <a href="${RESOURCE_URL}/student/main" class="corename2">资源中心</a>
	                    <p class="coreintroduce">提供强大的管理功能和大量的学习辅助资源，为学生在自主学习中提供有力辅导。</p>
	                </div>
	            </li>
	            <%-- <li class="exchange">
	                <a href=""><img class="icon" src="${ctx }/staticfile/images/student/test.png"></a>
	                <div class="fonts">
	                    <a href="" class="corename3">考试中心</a>
	                    <p class="coreintroduce">支持综合考试、单元练习、考试中断恢复，错题解析，错题组卷反复练习等功能。</p>
	                </div>
	            </li> --%>
	           <%--  <li class="syn">
	                <a href="" target="_target"><img class="icon" src="${ctx }/staticfile/images/student/syn.png"></a>
	                <div class="fonts">
	                    <a href="" class="corename1" target="_target">同步课堂</a>
	                    <p class="coreintroduce">支持共享电子白板、语音、文字，远程桌面，多人视频讨论，在线共享课程、文件等功能。</p>
	                </div>
	            </li> --%>
	            <li class="web">
	                <a href="${WEB_SITE_URL }/webController/main"><img class="icon" src="${ctx }/staticfile/images/student/web.png"></a>
	                <div class="fonts">
	                    <a href="${WEB_SITE_URL }/webController/main" class="corename3">信息中心</a>
	                    <p class="coreintroduce">信息门户网站建设模块是虚拟仿真实验教学中心信息展示综合平台。</p>
	                </div>
	            </li>
	        </ul>
	    </div>
	</div>
	<div style="clear: both"></div>
	<jsp:include page="./footer.jsp"></jsp:include>
</body>
</html>