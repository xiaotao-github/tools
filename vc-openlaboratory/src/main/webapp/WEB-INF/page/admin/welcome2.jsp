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
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" href="${ctx }/staticfile/css/reset.css">
<link rel="stylesheet" href="${ctx }/staticfile/css/welcomeTeach2.css">
<style type="text/css">
.hide_Validform {
	display: none !important;
}
</style>
</head>
<body class="bc-lightGray">
	<div class="bc-lightGray pd-20 clearfix">
		<a class="btn btn-success radius r mrb-10"
			style="line-height: 1.6em; margin-top: 3px; color: #fff;"
			href="javascript:location.replace(location.href);" title="刷新"> <i
			class="iconfont icon-shuaxin"></i>
		</a>
		<div class="welcomeLeftPart fl">
			<div class="experimentCenterTeacherInfo mrr-20">
				<div class="experimentCenterTeacherAvatar">
					<p class="pd-5"
						style="border-radius: 50%; width: 120px; height: 120px;">
						<c:choose>
							<c:when test="${empty teacherInfo.imagePath }">
								<img
									src="${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg"
									alt="">
							</c:when>
							<c:otherwise>
								<img
									src="${cookie.RESOURCE_WAY.value}/${teacherInfo.imagePath }"
									alt="">
							</c:otherwise>
						</c:choose>
					</p>
				</div>
				<p class="experimentCenterTeacherMsg">
					欢迎你! <span>${teacherInfo.department.name }</span> <span>${teacherInfo.role.name }</span>
					<span>${teacherInfo.name }</span>
				</p>
				<p class="experimentCenterTeacherTxt fc-white">
					这是你的第<span class="fc-orange">${teacherInfo.loginNumber }</span>次登录,<br>
					上次登录时间为<span class="fc-orange"><fmt:formatDate
							value="${teacherInfo.preTime}" pattern="yyyy-MM-dd HH:mm:ss" /></span><br>
				</p>
			</div>
			<div class="chapterDetailNote boxBorder mrr-20 bc-white mrt-20">
				<p class="title fs-16 fw-bold">
					<span class="pdl-10 pdr-10 mrl-10 span">教学笔记</span><span
						class="more fs-14"><a href="##"
						onClick="teachnote('实验笔记','${ctx }/page/admin/teachnote.html')">更多>></a></span>
				</p>
				<div class="pd-10 bc-white welcomePageNoteList">
					<div class="clearfix mrb-10" style="border: 1px solid #ccc;">
						<form action="${ctx}/teachNotesController/addNotes" method="post"
							id="noteForm">
							<textarea name="notesContent" id="notesContent" cols="30"
								rows="10" class="" datatype="*" errormsg="不能为空！"></textarea>
							<input type="button"
								class="bc-darkGreen pdl-10 pdr-10 fs-16 fc-white mr-5 noteAddSubBtn"
								value="保存">
						</form>
					</div>
					<ul>
						<c:forEach items="${teacherNoteList }" var="teacherNote" end="4">
							<li class="clearfix mrb-15">
								<p class="noteAddedTime">
									<span class="span2 fs-20 "> <fmt:formatDate
											value="${teacherNote.createTime}" pattern="dd" />
									</span><span class="span1"> <fmt:formatDate
											value="${teacherNote.createTime}" pattern="yyyy-MM" />
									</span>
								</p>
								<p class="noteContain pdt-5 pdb-5 fs-12">${teacherNote.notesContent }</p>
								<p style="position: absolute; top: -2px; right: -7px;">
									<img src="${ctx }/staticfile/images/noteBg.png" />
								</p>
							</li>
						</c:forEach>
					</ul>
				</div>
			</div>
		</div>
		<div class="welcomeRightPart fl">
			<div class="experimentCenterControl clearfix">
				<div class="experimentCenterCtrIcon boxBorder bc-white fl">
					<p class="pd-5 fs-16 fw-bold">
						<span class="pdl-10 pdr-10 mrl-5">快捷操作</span>
					</p>
					<ul class="pd-5 clearfix">
						<shiro:hasPermission name="添加实验(所有) or 添加实验(院系) or 添加实验(个人)">
							<li class="pdt-15 pdb-15"><a
								data-href="${ctx}/experimentController/toAddExperimentPage/3"
								data-title="添加实验" onclick="Hui_admin_tab(this);"> <img
									src="${ctx }/staticfile/images/admin_main/a1.png" alt="">
									<span class="fs-12">添加实验</span>
							</a></li>
						</shiro:hasPermission>
						<shiro:lacksPermission name="添加实验(所有) or 添加实验(院系) or 添加实验(个人)">
							<li class="pdt-15 pdb-15"><a
								onclick="alertMsg('对不起,您没有权限添加实验')"> <img
									src="${ctx }/staticfile/images/admin_main/a1.png" alt="">
									<span class="fs-12">添加实验</span>
							</a></li>
						</shiro:lacksPermission>
						<c:set var="temp1" value="0" />
						<shiro:hasPermission name="查看实验课程(个人)">
							<c:set var="temp1" value="1" />
							<li class="pdt-15 pdb-15"><a
								data-href="${ctx }/experimentCourseController/selectExperimentCoursesToPage/3"
								data-title="我的课程" onclick="Hui_admin_tab(this);"> <img
									src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
									<span class="fs-12">添加/查看课程实验</span>
							</a></li>
						</shiro:hasPermission>
						<c:if test="${temp1 eq 0 }">
							<shiro:hasPermission name="查看实验课程(院系)">
								<c:set var="temp1" value="1" />
								<li class="pdt-15 pdb-15"><a
									data-href="${ctx }/experimentCourseController/selectExperimentCoursesToPage/2"
									data-title="院系课程" onclick="Hui_admin_tab(this);"> <img
										src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
										<span class="fs-12">添加/查看课程实验</span>
								</a></li>
							</shiro:hasPermission>
						</c:if>
						<c:if test="${temp1 eq 0 }">
							<shiro:hasPermission name="查看实验课程(所有)">
								<c:set var="temp1" value="1" />
								<li class="pdt-15 pdb-15"><a
									data-href="${ctx }/experimentCourseController/selectExperimentCoursesToPage/1"
									data-title="所有课程" onclick="Hui_admin_tab(this);"> <img
										src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
										<span class="fs-12">添加/查看课程实验</span>
								</a></li>
							</shiro:hasPermission>
						</c:if>
						<c:if test="${temp1 eq 0 }">
							<li class="pdt-15 pdb-15"><a href="javascript:void(0)"
								onclick="alertMsg('对不起,您没有权限添加/查看课程实验')"> <img
									src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
									<span class="fs-12">添加/查看课程实验</span>
							</a></li>
						</c:if>

						<c:set var="temp2" value="0" />
						<shiro:hasPermission name="查看实验(所有)">
							<c:set var="temp2" value="1" />
							<li class="pdt-15 pdb-15"><a
								data-href="${ctx }/experimentController/selectExperimentToPage/${cookie.vcoocUserId.value}/1"
								data-title="所有实验" onclick="Hui_admin_tab(this);"> <img
									src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
									<span class="fs-12">查看实验库</span>
							</a></li>
						</shiro:hasPermission>
						<c:if test="${temp2 eq 0 }">
							<shiro:hasPermission name="查看实验(院系)">
								<c:set var="temp2" value="1" />
								<li class="pdt-15 pdb-15"><a
									data-href="${ctx }/experimentController/selectExperimentToPage/${cookie.vcoocUserId.value}/2"
									data-title="院系实验" onclick="Hui_admin_tab(this);"> <img
										src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
										<span class="fs-12">查看实验库</span>
								</a></li>
							</shiro:hasPermission>
						</c:if>
						<c:if test="${temp2 eq 0 }">
							<shiro:hasPermission name="查看实验(个人)">
								<c:set var="temp2" value="1" />
								<li class="pdt-15 pdb-15"><a
									data-href="${ctx }/experimentController/selectExperimentToPage/${cookie.vcoocUserId.value}/3"
									data-title="我的实验" onclick="Hui_admin_tab(this);"> <img
										src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
										<span class="fs-12">查看实验库</span>
								</a></li>
							</shiro:hasPermission>
						</c:if>
						<c:if test="${temp2 eq 0 }">
							<li class="pdt-15 pdb-15"><a
								onclick="alertMsg('对不起,您没有权限查看实验库')"> <img
									src="${ctx }/staticfile/images/admin_main/a3.png" alt="">
									<span class="fs-12">查看实验库</span>
							</a></li>
						</c:if>

						<c:set var="temp1" value="0" />
						<shiro:hasPermission name="查看实验课程(个人)">
							<c:set var="temp1" value="1" />
							<li class="pdt-15 pdb-15"><a
								data-href="${ctx }/experimentLabController/list/3"
								data-title="我的实验室" onclick="Hui_admin_tab(this);"> <img
									src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
									<span class="fs-12">查看实验室</span>
							</a></li>
						</shiro:hasPermission>
						<%-- 			<shiro:hasPermission name="查看实验课程(院系)">
								<c:set var="temp1" value="1"/>
								<li class="pdt-15 pdb-15">
								<a data-href="${ctx }/experimentLabController/list/2" data-title="院系实验室" onclick="Hui_admin_tab(this);">
									<img src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
									<span class="fs-12">查看实验室</span>
								</a>
								</li>
							</shiro:hasPermission> --%>
						<c:if test="${temp1 eq 0 }">
							<shiro:hasPermission name="查看实验课程(所有)">
								<c:set var="temp1" value="1" />
								<li class="pdt-15 pdb-15"><a
									data-href="${ctx }/experimentLabController/list/1"
									data-title="所有课程" onclick="Hui_admin_tab(this);"> <img
										src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
										<span class="fs-12">查看实验室</span>
								</a></li>
							</shiro:hasPermission>
						</c:if>
						<c:if test="${temp1 eq 0 }">
							<li class="pdt-15 pdb-15"><a href="javascript:void(0)"
								onclick="alertMsg('对不起,您没有权限添加/查看课程实验')"> <img
									src="${ctx }/staticfile/images/admin_main/a2.png" alt="">
									<span class="fs-12">添加/查看课程实验</span>
							</a></li>
						</c:if>
					</ul>
				</div>
				<div class="experimentCenterCtrRecord boxBorder bc-white fr">
					<p class="pd-5 fs-16 fw-bold">
						<span class="pdl-10 pdr-10 mrl-5">实验操作记录</span>
					</p>
					<ul class="fs-12 fc-darkGreen">
						<c:forEach items="${logs }" var="log">
							<li class="pd-10 pdl-15">${log.message}<span
								class="pdl-10 fc-bbb"> <fmt:formatDate
										value="${log.operationTime }" pattern="yyyy-MM-dd HH:mm:ss" />
							</span></li>
						</c:forEach>
					</ul>
				</div>
			</div>
			<div
				class="experimentCenterStuDynamics boxBorder bc-white pd-10 mrt-10">
				<p class="title fs-16 fw-bold">
					<span class="pdl-10 pdr-10 mrl-10">学生实验成绩</span>
				</p>
				<div class="">
					<ul>

						<c:forEach items="${scheduleStudentScoreList }"
							var="scheduleStudentScore">
							<li class="mrt-5 pd-5 clearfix"><a data-title="实验批阅"
								onclick="Hui_admin_tab(this)"
								data-href="${ctx }/scheduleStudentScoreController/selectById/${scheduleStudentScore.scheduleStudentScoreId }"
								title="批阅">
									<p class="fs-12 fc-666" style="width: 70%;">
										<span class="fc-orange fs-14 pdr-5">${scheduleStudentScore.studentName }</span>提交了《<span
											class="pdl-5 pdr-5">${scheduleStudentScore.courseName }</span>》课程中的《<span
											class="pdl-5 pdr-5">${scheduleStudentScore.experimentName }</span>》实验
										<i> <c:choose>
												<c:when test="${scheduleStudentScore.submitStatus ==2 }">待批改</c:when>
												<c:when test="${scheduleStudentScore.submitStatus ==4 }">重做中</c:when>
											</c:choose>
										</i> <span class="fc-bbb pdr-20 pdl-20 span"> <fmt:formatDate
												value="${scheduleStudentScore.updateTime }"
												pattern="yyyy-MM-dd HH:mm:ss" />
										</span>
									</p>
							</a></li>
						</c:forEach>
					</ul>
				</div>
			</div>
			<div class="courseDetail mrt-10 bc-white pd-20 boxBorder">
				<ul class="departmentNav fw-bold clearfix">
					<c:forEach items="${departmentList }" var="department"
						varStatus="vs">
						<li
							class="fl pd-20 pdt-5 pdb-5 mrr-5 <c:if test="${vs.index eq 0}">checked</c:if>"><span>${department.name }</span></li>
					</c:forEach>
				</ul>
				<ul class="">
					<!-- 一个li对应一个学院 -->
					<c:forEach items="${departmentList }" var="department"
						varStatus="vs">
						<c:if test="${vs.index eq 0}">
							<li class="eachDepartment pdb-5 checked">
						</c:if>
						<c:if test="${vs.index != 0}">
							<li class="eachDepartment pdb-5 ">
						</c:if>
						<div class="clearfix">
							<p
								class="experimentCourseStyleTitle fs-16 pdl-10 pdt-15 pdb-10 fw-bold">
								<span class="slide" onclick="dropAndUp(this);" slideType="0"><img
									src="${ctx }/staticfile/images/admin_main/drop.png" alt=""></span><span>实验课程</span><span>[共<em>${department.experimentCourseList.size() }</em>个]
								</span>
							</p>
							<ul class="eachExperimentCourseList clearfix">
								<c:forEach items="${department.experimentCourseList }"
									var="experimentCourse">
									<li class="eachcourse eachExperimentCourse fl">
										<div class="experimentCoursePost fl mr-10 mrl-0 pdl-10">
											<c:if
												test="${empty experimentCourse.resourceFile.fileFormatPath}">
												<img
													src="${cookie.RESOURCE_WAY.value}/system_file/img/experiment_course_default.png"
													alt="课程封面">
											</c:if>
											<c:if test="${experimentCourse.resourceFile != null }">
												<img
													src="${cookie.RESOURCE_WAY.value}/${experimentCourse.resourceFile.fileFormatPath}"
													alt="课程封面">
											</c:if>
										</div>
										<div
											class="courseInfo fs-12 fl pd-5 pdt-10 pdb-10 fc-999 fw-bold">
											<p>
												<span class="fc-darkGreen fw-bold fs-14"> <c:choose>
														<c:when
															test="${fn:length(experimentCourse.courseName)>10 }">
															<c:out
																value="${fn:substring(experimentCourse.courseName,0,10) }..." />
														</c:when>
														<c:otherwise>${experimentCourse.courseName }</c:otherwise>
													</c:choose>

												</span>
											</p>


											<div class="experimentCourseTeachersList cl fc-999"
												title="
											<c:forEach items="${experimentCourse.teacherInfoList }" var="teacherInfo" varStatus="vs">${teacherInfo.name }&nbsp;</c:forEach>">
												<span class="span fl">任课教师: [ <c:forEach
														items="${experimentCourse.teacherInfoList }"
														var="teacherInfo" varStatus="vs" begin="0" end="">
														<em class="fc-darkGreen">${teacherInfo.name }</em>
													</c:forEach>]
												</span>
											</div>
										</div>
									</li>
								</c:forEach>
							</ul>
						</div>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
	<%@include file="../footer.jsp"%>
</body>
<script type="text/javascript">
	var realPath = "${cxt}";
</script>
<script type="text/javascript"
	src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript"
	src="${ctx }/staticfile/js/layer/layer.js"></script>
<script type="text/javascript"
	src="${ctx }/staticfile/js/welcomeTeach.js"></script>
<script type="text/javascript"
	src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript"
	src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript"
	src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">
	/*提交笔记*/
	$("#noteForm")
			.Validform(
					{
						btnSubmit : ".noteAddSubBtn",
						tiptype : 2,
						ignoreHidden : false,
						dragonfly : false,
						tipSweep : false,
						label : ".label",
						showAllError : false,
						postonce : true,
						ajaxPost : true,
						datatype : {

						},
						usePlugin : {
							swfupload : {},
							datepicker : {},
							passwordstrength : {},
							jqtransform : {
								selector : "select,input"
							}
						},
						beforeCheck : function(curform) {
							//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
							//这里明确return false的话将不会继续执行验证操作;	
						},
						beforeSubmit : function(curform) {
							//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
							//这里明确return false的话表单将不会提交;	
						},
						callback : function(data) {
							if (data.status == "200") {
								var index = parent.layer
										.getFrameIndex(window.name);
								var times = data.data.createTime;
								times = parseInt(times, 10);//转为整形
								var date = new Date(times);//正确
								var content = '<li class="clearfix mrb-15"><p class="noteAddedTime"><span class="span2 fs-20">'
										+ date.getDate()
										+ '</span>'
										+ '<span class="span1">'
										+ date.getFullYear()
										+ "-"
										+ (date.getMonth() + 1)
										+ '</span></p>'
										+ '<p class="noteContain pdt-5 pdb-5 fs-12">'
										+ data.data.notesContent
										+ '</p><p style="position:absolute;top:-2px;right:-7px;"><img src="${ctx }/staticfile/images/noteBg.png"/></p>'
										+ '</li>';
								$(".welcomePageNoteList ul").append(content);
								var text = '';
								$('#notesContent').val(text);

								layer.msg('添加成功!', {
									icon : 1,
									time : 1500
								});
								parent.layer.close(index);
							} else {
								layer.msg(data.msg, {
									icon : 1,
									time : 1500
								});
								/* window.location.reload(); */
							}
						}
					});
	/*实验笔记*/
	function teachnote(title, url) {
		var index = layer.open({
			type : 2,
			title : title,
			content : url,
			area : [ '100%', '100%' ],
			fix : true,
			maxmin : false,
			shade : 0.4,
			scrollbar : false,
			resize : true,
		});
	}
	/*提示消息弹出方法  */
	function alertMsg(msg) {
		layer.alert(msg, {
			title : '温馨提示'
		});
	}
	$().ready(function() {
		$("#Validform_msg").addClass("hide_Validform");
	})
	/* $(function(){
	 $(".course_name").each(function(){
	 var coursename = $(this).html();
	 if(coursename.length>10){
	 $(this).html(coursename.substring(0,10));
	 }
	 })	
	 }) */
</script>
</html>