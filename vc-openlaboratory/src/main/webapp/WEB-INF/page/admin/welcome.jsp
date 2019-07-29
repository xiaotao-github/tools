<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>实验室开放与预约管理系统</title>
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" href="${ctx }/staticfile/css/reset.css">
<%-- <link rel="stylesheet" href="${ctx }/staticfile/lib/daypilot/themes/dayPilot-blue.css"> --%>
<link rel="stylesheet" href="${ctx }/staticfile/css/welcomeTeach.css">
<style type="text/css">
.hide_Validform {
	display: none !important;
}
</style>
</head>
<body class="bc-lightGray">
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页
		<span class="c-gray en">&gt;</span>
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin" style="color:#fff;"></i>
		</a>
	</nav>
	<div class="pd-20 clearfix">
		<div class="col-lg-12 col-sm-12">
			<div class="topPart box-shadow boxBorder radius">
				<div class="clearfix teacherMsg">
					<div class="clearfix col-lg-7 col-sm-12">
						<div class="teacherAvatar f-l">
							<%-- <c:choose>
								<c:when test="${empty teacherInfo.imagePath }">
									<img src="${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg" alt="">
								</c:when>
								<c:otherwise>
									<img src="${cookie.RESOURCE_WAY.value}/${teacherInfo.imagePath }" alt="">
								</c:otherwise>
							</c:choose> --%>
							<img src="${RESOURCE_WAY }/${teacherInfo.imagePath }">
						</div>
						<div class="f-l ml-30 msgBox">
							<p><span>欢迎你!</span></p>
							<p class="fw-bold f-16"><span>${teacherInfo.department.name }</span> <span>${teacherInfo.role.name }</span></p>
							<p class="f-22 fw-bold"><span>${teacherInfo.name }</span></p>
							<div class="bg-1 bk-gray pl-20 pr-20 pt-5 pb-5 mt-10 c-666">
								<p>这是你的第<span class="c-orange pl-5 pr-5">${teacherInfo.loginNumber }</span>次登录,上次登录时间为<span class="c-orange pr-5 pl-5"><fmt:formatDate value="${teacherInfo.preTime}" pattern="yyyy-MM-dd HH:mm:ss" /></span></p>
							</div>
						<%-- 	<div class="noteBtn" onclick="window.open('${SSO_URL }/teacherController/tomyselfInfoRevise')">
								<span class="btn btn-warning radius"><i class="Hui-iconfont Hui-iconfont-feedback1 f-20"></i></span>
							</div> --%>
						</div>
					</div>
					<div class="sysCount col-lg-5 col-sm-12 text-c clearfix mrt-10 visible-lg-block">
						<div class="col-lg-4 col-sm-4">
							<p class="num radius"><span>${courseCount }</span></p>
							<p class="name">课程</p>
						</div>
						<div class="col-lg-4 col-sm-4">
							<p class="num radius"><span>${experimentCount }</span></p>
							<p class="name">实验</p>
						</div>
						<div class="col-lg-4 col-sm-4">
							<p class="num radius"><span>${labCount }</span></p>
							<p class="name">实验室</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="col-lg-4 col-sm-4 mt-20">
			<div class="chapterDetailNote boxBorder bc-white box-shadow radius">
				<p class="title pd-5 f-16 fw-bold">
					<span class="pl-10 pr-10 ml-5 span">我的笔记</span><span class="more f-14"><a href="##" onClick="teachnote('我的笔记','${ctx }/page/admin/teachnote.html')">更多>></a></span>
				</p>
				<div class="pd-10 bc-white welcomePageNoteList">
					<div class="clearfix mb-10" style="border: 1px solid #ccc;">
						<form action="${ctx}/teachNotesController/addNotes" method="post" id="noteForm">
							<textarea name="notesContent" id="notesContent" cols="30" rows="10" class="" datatype="*" errormsg="不能为空！"></textarea>
							<input type="button" class="bc-lightBlue pdl-10 pdr-10 fs-16 fc-white mr-5 noteAddSubBtn btn radius" value="保存">
						</form>
					</div>
					<div class="teacherNoteList" style="overflow:auto;max-height:320px;">
						<ul>
							<c:forEach items="${teacherNoteList }" var="teacherNote" end="4">
								<li class="clearfix mb-15">
									<p class="noteAddedTime">
										<span class="span2 f-20 "> <fmt:formatDate value="${teacherNote.createTime}" pattern="dd" />
										</span><span class="span1"> <fmt:formatDate value="${teacherNote.createTime}" pattern="yyyy-MM" />
										</span>
									</p>
									<p class="noteContain pt-5 pb-5 f-12">${teacherNote.notesContent }</p>
									<%-- <p style="position: absolute; top: -2px; right: -7px;">
										<img src="${ctx }/staticfile/images/noteBg.png" />
									</p> --%>
								</li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-8 col-sm-8 mt-20">
			<div class="experimentCenterControl clearfix row">
				<div class="experimentCenterCtrIcon col-lg-6 col-sm-6">
					<div class="boxBorder bc-white radius box-shadow">
						<p class="pd-5 f-16 fw-bold">
							<span class="pl-10 pr-10 ml-5">快捷操作</span>
						</p>
						<ul class="pd-5 clearfix">
						<shiro:hasPermission name="通用实验室  ">
							<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a data-href="${ctx }/experimentLabController/list/1"data-title="通用实验室"  onclick="Hui_admin_tab(this);">
										<img src="${ctx }/staticfile/images/admin_main/a5.png" alt="">
										<span class="f-14">通用实验室</span>
									</a>
								</li>
						</shiro:hasPermission>
						
							<shiro:hasPermission name="个人开放与预约课程  or 院系开放与预约课程 or 所有开放与预约课程">
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a data-href="${ctx}/experimentController/toAddAllExperimentPage/3" data-title="添加实验" onclick="Hui_admin_tab(this);">
										<img src="${ctx }/staticfile/images/admin_main/a1.png" alt="">
										<span class="f-14">添加实验</span>
									</a>
								</li>
							</shiro:hasPermission>
							<shiro:lacksPermission name="个人开放与预约课程  or 院系开放与预约课程 or 所有开放与预约课程">
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a onclick="alertMsg('对不起,您没有权限添加实验')">
										<img src="${ctx }/staticfile/images/admin_main/a1.png" alt="">
										<span class="f-12">添加实验</span>
									</a>
								</li>
							</shiro:lacksPermission>
							<c:set var="temp1" value="0" />
							<shiro:hasPermission name="个人开放与预约课程 ">
								<c:set var="temp1" value="1" />
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a data-href="${ctx }/experimentCourseController/selectExperimentCoursesToPage/3" data-title="我的课程" onclick="Hui_admin_tab(this);">
										<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
										<span class="f-14">我的课程</span>
									</a>
								</li>
							</shiro:hasPermission>
							<c:if test="${temp1 eq 0 }">
								<shiro:hasPermission name="院系开放与预约课程 ">
									<c:set var="temp1" value="1" />
									<li class="pt-10 pb-10 col-lg-4 col-sm-6">
										<a data-href="${ctx }/experimentCourseController/selectExperimentCoursesToPage/2" data-title="院系课程" onclick="Hui_admin_tab(this);">
											<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
											<span class="f-14">院系课程</span>
										</a>
									</li>
								</shiro:hasPermission>
							</c:if>
							<c:if test="${temp1 eq 0 }">
								<shiro:hasPermission name="所有开放与预约课程 ">
									<c:set var="temp1" value="1" />
									<li class="pt-10 pb-10 col-lg-4 col-sm-6">
										<a data-href="${ctx }/experimentCourseController/selectExperimentCoursesToPage/1" data-title="所有课程" onclick="Hui_admin_tab(this);">
											<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
											<span class="f-14">所有课程</span>
										</a>
									</li>
								</shiro:hasPermission>
							</c:if>
							<c:if test="${temp1 eq 0 }">
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a href="javascript:void(0)" onclick="alertMsg('对不起,您没有权限添加/查看所有课程实验')">
										<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
										<span class="f-14">所有课程</span>
									</a>
								</li>
							</c:if>
	
							<c:set var="temp2" value="0" />
							<shiro:hasPermission name="所有开放与预约课程 ">
								<c:set var="temp2" value="1" />
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a data-href="${ctx }/experimentController/selectExperimentToPage/${cookie.vcoocUserId.value}/1" data-title="所有实验" onclick="Hui_admin_tab(this);">
									<img src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
										<span class="f-14">查看实验库</span>
									</a>
								</li>
							</shiro:hasPermission>
						<%-- 	<c:if test="${temp2 eq 0 }">
								<shiro:hasPermission name="院系开放与预约课程 ">
									<c:set var="temp2" value="1" />
									<li class="pt-10 pb-10 col-lg-4 col-sm-6">
										<a data-href="${ctx }/experimentController/selectExperimentToPage/${cookie.vcoocUserId.value}/2" data-title="院系实验" onclick="Hui_admin_tab(this);">
											<img src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
											<span class="f-12">查看实验库</span>
										</a>
									</li>
								</shiro:hasPermission>
							</c:if> --%>
							<c:if test="${temp2 eq 0 }">
								<shiro:hasPermission name="个人开放与预约课程 ">
									<c:set var="temp2" value="1" />
									<li class="pt-10 pb-10 col-lg-4 col-sm-6">
										<a data-href="${ctx }/experimentController/selectExperimentToPage/${cookie.vcoocUserId.value}/3" data-title="我的实验室库" onclick="Hui_admin_tab(this);">
											<img src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
											<span class="f-14">查看实验库</span>
										</a>
									</li>
								</shiro:hasPermission>
							</c:if>
							<c:if test="${temp2 eq 0 }">
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a onclick="alertMsg('对不起,您没有权限查看实验库')">
										<img src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
										<span class="f-14">查看实验库</span>
									</a>
								</li>
							</c:if>
	
							<c:set var="temp1" value="0" />
							<shiro:hasPermission name="个人实验室管理">
								<c:set var="temp1" value="1" />
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a data-href="${ctx }/experimentLabController/experimentLabList/3" data-title="实验室管理" onclick="Hui_admin_tab(this);">
										<img src="${ctx }/staticfile/images/admin_main/a6.png" alt="">
										<span class="f-14">实验室管理</span>
									</a>
								</li>
							</shiro:hasPermission>
						<%-- 	<shiro:hasPermission name="院系开放与预约课程 ">
									<c:set var="temp1" value="1"/>
									<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a data-href="${ctx }/experimentLabController/list/2" data-title="院系实验室" onclick="Hui_admin_tab(this);">
										<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
										<span class="fs-12">查看实验室</span>
									</a>
									</li>
								</shiro:hasPermission> --%>
							<c:if test="${temp1 eq 0 }">
								<shiro:hasPermission name="所有开放与预约课程 ">
									<c:set var="temp1" value="1" />
									<li class="pt-10 pb-10 col-lg-4 col-sm-6">
										<a data-href="${ctx }/experimentLabController/list/1" data-title="所有课程" onclick="Hui_admin_tab(this);">
											<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
											<span class="f-14">查看实验室</span>
										</a>
									</li>
								</shiro:hasPermission>
							</c:if>
							<%-- <c:if test="${temp1 eq 0 }">
								<li class="pt-10 pb-10 col-lg-4 col-sm-6">
									<a href="javascript:void(0)" onclick="alertMsg('对不起,您没有权限添加/查看课程实验')">
										<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
										<span class="f-14">添加/查看课程实验</span>
									</a>
								</li>
							</c:if> --%>
						</ul>
					</div>
				</div>
				<div class="experimentCenterCtrRecord col-lg-6 col-sm-6">
					<div class="boxBorder radius bc-white box-shadow" style="overflow:hidden;">
						<p class="pd-5 f-16 fw-bold">
							<span class="pl-10 pr-10 ml-5">我的操作记录</span>
						</p>
						<ul class="f-12 fc-darkGreen">
							<c:choose>
								<c:when test="${!empty logs }">
								<c:forEach items="${logs }" var="log">
									<li class="pd-5 pl-15">
										<div>${log.message}</div><div class="text-r"><span class="pl-10 fc-bbb"> <fmt:formatDate value="${log.operationTime }" pattern="yyyy-MM-dd HH:mm:ss" /></span></div>
									</li>
								</c:forEach>
								</c:when>
								<c:otherwise>
									<li style="width:65%;margin:0 auto;border:none;"><img style="display:block;width:100%;height:100%;" src="${ctx}/staticfile/images/null.png"></li>
								</c:otherwise>
							</c:choose>
						</ul>
					</div>
				</div>
			</div>
			<div class="experimentCenterStuDynamics boxBorder bc-white mt-20 radius">
				<p class="title pd-5 f-16 fw-bold">
					<span class="pl-10 pr-10 ml-5">学生实验成绩</span>
				</p>
				<%-- <c:if test="${empty  scheduleStudentScoreList }"> <div class="Hui-tags-has"><p style="text-align:center;color:red; font-size:30px "  >真棒，都完成了！</p> </div></c:if> --%>
				<shiro:hasPermission name="个人开放与预约课程 ">
				<div class="">
					<ul>
						<c:choose>
							<c:when test="${!empty scheduleStudentScoreList }">
							<c:forEach items="${scheduleStudentScoreList }"
								var="scheduleStudentScore">
								<li class="mt-5 pd-5 clearfix">
									<a data-title="实验批阅" onclick="Hui_admin_tab(this)" data-href="${ctx }/scheduleStudentScoreController/selectById/${scheduleStudentScore.scheduleStudentScoreId }" title="批阅">
										<p class="f-12 fc-666" style="width: 70%;">
											<span class="fc-orange f-14 pr-5">${scheduleStudentScore.studentName }</span>提交了《
											<span class="pl-5 pr-5">${scheduleStudentScore.courseName }</span>》课程中的《
											<span class="pl-5 pr-5">${scheduleStudentScore.experimentName }</span>》实验
											<i> 
												<c:choose>
													<c:when test="${scheduleStudentScore.submitStatus ==2 }">待批改</c:when>
													<c:when test="${scheduleStudentScore.submitStatus ==4 }">重做中</c:when>
												</c:choose>
											</i>
											<span class="fc-bbb pr-20 pl-20 span"><fmt:formatDate value="${scheduleStudentScore.updateTime }" pattern="yyyy-MM-dd HH:mm:ss" /></span>
										</p>
									</a>
								</li>
							</c:forEach>
							</c:when>
							<c:otherwise>
								<li style="margin:0 auto;border:none;"><img style="display:block;height:150px;margin:0 auto;" src="${ctx}/staticfile/images/null.png"></li>
							</c:otherwise>
						</c:choose>
					</ul>
				</div>
			</shiro:hasPermission>
			</div>
		</div>
	</div>
	<%@include file="../footer.jsp"%>
</body>
<script type="text/javascript">
	var ctx = "${cxt}";
	var PEXPERIMENTOPEN ="${cookie.PEXPERIMENTOPEN.value}";
	var WISDOMLAB = "${WISDOMLAB}";
</script>
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/layer/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/welcomeTeach.js"></script>

</html>