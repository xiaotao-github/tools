<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>欢迎来到虚拟仿真实验教学平台</title>
    <link href="${ctx }/staticfile/css/index.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx }/staticfile/font-awesome-4.7.0/css/font-awesome.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/myselfInfoRevise.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/passwordRevise.css">
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
	        <p class="subtitle">这里有满足您所有教学的一切需求。</p>
	        <ul class="clearfix">
	            <li>
	                <a href="${cookie.CLASSROOM_URL.value }/page/index" class="icon"><img id="core-1" src="${ctx }/staticfile/images/teach-2.png"></a>
	                <a href="${cookie.CLASSROOM_URL.value }/page/index" class="corename">教学中心</a>
	                <p class="coreintroduce">实现了课堂教学与网络教学相结合的混合式教学模式。</p>
	            </li>
	            <%-- <li>
	                <a href="${MANAGE_URL}/page/index" class="icon"><img id="core-1" src="${ctx }/staticfile/images/manage-2.png"></a>
	                <a href="${MANAGE_URL}/page/index" class="corename">行政中心</a>
	                <p class="coreintroduce">它承载了整个平台的体系架构，是平台正常运转的框架与核心。</p>
	            </li> --%>
	            <li>
	                <a href="${cookie.VS_EXPERIMENT.value }/page/admin/index?identify=1" class="icon"><img id="core-2" src="${ctx }/staticfile/images/exper-2.png"></a>
	                <a href="${cookie.VS_EXPERIMENT.value }/page/admin/index?identify=1" class="corename">实验中心</a>
	                <p class="coreintroduce">为实验教师提供全新的实验教学和智能化管理手段。</p>
	            </li>
	            <%-- <li>
	                <a href="" class="icon"><img id="core-3" src="${ctx }/staticfile/images/exe-2.png"></a>
	                <a href="" class="corename">实训中心</a>
	                <p class="coreintroduce">实体实验的虚拟化作为学生做硬件实验前的预习，通过3D虚拟仿真实验场景、呈现逼真的虚拟仿真实验过程、从而提高学生的动手实践能力。</p>
	            </li> --%>
	            <li>
	                <a href="${TEACHER_SPACE_URL}/page/admin/index" class="icon"><img id="core-5" src="${ctx }/staticfile/images/coo-2.png"></a>
	                <a href="${TEACHER_SPACE_URL}/page/admin/index" class="corename">协同学习</a>
	                <p class="coreintroduce">主要基于协同学习模式组织学生学习，学生可以创建学习共同体，采用六步法开展教学。</p>
	            </li>
	            <li>
	                <a href="${EXAM_URL }/exam3/AdminLogin.jspx" class="icon" target="_target"><img id="core-4" src="${ctx }/staticfile/images/test-2.png"></a>
	                <a href="${EXAM_URL }/exam3/AdminLogin.jspx" class="corename" target="_target">考试中心</a>
	                
	                <p class="coreintroduce">本系统适用于各类复杂的考试领域，适用性、扩展性、稳定性良好。</p>
	            </li>
	            <%-- <li>
	                <a href="${cookie.RESOURCE_URL.value}/page/main/index" class="icon"><img id="core-4" src="${ctx }/staticfile/images/resource-2.png"></a>
	                <a href="${cookie.RESOURCE_URL.value}/page/main/index" class="corename">资源中心</a>
	                
	                <p class="coreintroduce">提高教学资源的利用效率，促进优质教育资源的应用与承载，共享。</p>
	            </li> --%>
	            <li>
	                <a href="${DISCUSSION_URL}/page/teacherInfo/index" class="icon"><img id="core-3" src="${ctx }/staticfile/images/communicate-2.png"></a>
	                <a href="${DISCUSSION_URL}/page/teacherInfo/index" class="corename">交流中心</a>
	                <p class="coreintroduce">支持学习者进行个性化的学习和鼓励学习者之间的交流，形成新的知识内容。</p>
	            </li>
	        </ul>
	    </div>
	</div>
	<div style="clear: both"></div>
	<div class="picture clear">
	    <div class="content">
	        <p class="title">一流，实用的教学，实验，考核管理平台</p>
	        <p class="subtitle">教学不再传统，学习不再乏味</p>
	        <ul class="clear">
	            <li class="administration">
	                <a href="${MANAGE_URL}/page/index"><img class="icon" src="${ctx }/staticfile/images/admin-2.png"></a>
	                <div class="fonts">
	                    <a href="${MANAGE_URL}/page/index" class="corename1">行政中心</a>
	                    <p class="coreintroduce">它承载了整个平台的体系架构，是平台正常运转的框架与核心。</p>
	                </div>
	            </li>
	            <li class="resource">
	                <a href="${cookie.RESOURCE_URL.value}/page/main/index"><img class="icon" src="${ctx }/staticfile/images/res-2.png"></a>
	                <div class="fonts">
	                    <a href="${cookie.RESOURCE_URL.value}/page/main/index"  class="corename2">资源中心</a>
	                    <p class="coreintroduce">提高教学资源的利用效率，促进优质教育资源的应用与承载，共享。</p>
	                </div>
	            </li>
	            <%-- <li class="exchange">
	                <a href="${DISCUSSION_URL}/page/teacherInfo/index"><img class="icon" src="${ctx }/staticfile/images/talk-2.png"></a>
	                <div class="fonts">
	                    <a href="${DISCUSSION_URL}/page/teacherInfo/index" class="corename3">交流中心</a>
	                    <p class="coreintroduce">有效的支持学习者进行个性化的学习和鼓励学习者之间的交流，形成新的知识内容。</p>
	                </div>
	            </li> --%>
	           <%-- <shiro:hasPermission name="信息门户管理">
		            <li class="exchange">
		                <a href="${WEB_SITE_URL}/backstageController/main"><img class="icon" src="${ctx }/staticfile/images/web.png"></a>
		                <div class="fonts">
		                    <a href="${WEB_SITE_URL}/backstageController/main" class="corename3">信息中心</a>
		                    <p class="coreintroduce">管理员用户可通过系统的导航栏目管理，自定义一级菜单，二级栏目，内容管理，新闻公告管理，后台推送，资源管理等功能。</p>
		                </div>
		            </li>
		       </shiro:hasPermission>
		        <shiro:lacksPermission name="信息门户管理">
		            <li class="exchange">
		                <a href="${WEB_SITE_URL}/webController/main"><img class="icon" src="${ctx }/staticfile/images/web.png"></a>
		                <div class="fonts">
		                    <a href="${WEB_SITE_URL}/webController/main"class="corename3">信息中心</a>
		                    <p class="coreintroduce">管理员用户可通过系统的导航栏目管理，自定义一级菜单，二级栏目，内容管理，新闻公告管理，后台推送，资源管理等功能。</p>
		                </div>
		            </li>
		       </shiro:lacksPermission> --%>
	           <%--  <li class="exchange">
	                <a href="" target="_target"><img class="icon" src="${ctx }/staticfile/images/syn.png"></a>
	                <div class="fonts">
	                    <a href="" class="corename3" target="_target">同步课堂</a>
	                    <p class="coreintroduce">支持共享电子白板、语音、文字，远程桌面，多人视频讨论，在线共享课程、文件等功能。</p>
	                </div>
	            </li> --%>
	        </ul>
	    </div>
	</div>
	<div style="clear: both"></div>
	<jsp:include page="./footer.jsp"></jsp:include>
</body>
</html>