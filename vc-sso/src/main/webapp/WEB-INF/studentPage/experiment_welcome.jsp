<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<jsp:include page="./header.jsp"></jsp:include>
<head>
	<meta charset="UTF-8">
	<title>智慧实验教学平台</title>
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/web_hui/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/web_hui/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/reset.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/public.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/footer.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experiment_welcome.css">
</head>
<body>
	<div class="page-container">
		<div class="welcomeContain">
			<div class="part1" onclick="to_href('${VS_EXPERIMENT}/page/web/index')">
				<div class="containTxt fc-white">
					<p class="fs-14">虚拟仿真实验加强实验教学环节管控，实现教学智能化管理，为实验工作人员提供全新的教学和管理手段，强化学生掌握实验方法，培养学生对教学实验的主动性，有效提高学生自主学习的积极性，提高实验教学质量。</p>
				</div>
				<p class="containName fc-white fw-bold fs-26 text-r">虚拟仿真实验</p>
			</div>
			 <div class="part2" onclick="to_href('${PEXPERIMENTOPEN}/page/student/index')">
			<!-- 以下链接是springboot 学生前端的链接 - 需要更换放开即可 -->
			<%-- <div class="part2" onclick="to_href('${PEXPERIMENT}/pexperiment/page/student/index')"> --%>
				<div class="containTxt fc-new-green">
					<p class="fs-14">同时充分利用PROTEUS仿真技术，多媒体技术，资源继承和整合，并提供模拟电路、数字电路、以及单片机等多种课程的电子元器件与虚拟仪器、实验案例、实验辅助资源、实现电子类课程的仿真实验实训，与仿真软件相结合，实现真正意义上的开放实验室，实现理论教学和实践教学的有机融合。
					</p>
				</div>
				<p class="containName fc-new-green fw-bold fs-26 text-l">课堂实验</p>
			</div>
		</div>
	</div>
	
	<jsp:include page="./footer.jsp"></jsp:include>
	<div class="vcoocfoot">
		<div style="width: 100%;height: 10px;background-color: #222;margin-top:60px;"></div>
	</div>
</body>
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
function to_href(url){
	window.location.href=url;
}

</script>
</html>