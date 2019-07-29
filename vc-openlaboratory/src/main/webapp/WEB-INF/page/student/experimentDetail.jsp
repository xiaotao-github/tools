<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ueditFilePath" value="${FILE_PATH }/${experimentFilePath}" scope="session"/>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/experiment_font/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/reset.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/public.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/footer.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/experimentDetail.css">
</head>
<body>
	<div class="breadcrumb">
		<div class="inner clearfix">
			<i class="Hui-iconfont">&#xe67f;</i>系统首页<i class="c-gray en">&gt;</i>>课程详情
			<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px;color:#fff;" href="javascript:location.replace(location.href);" title="刷新">
				<i class="iconfont icon-shuaxin"></i>
			</a>
		</div>
	</div>
	<div class="laboratory-container">
		<div class="inner clearfix box-shadow boxBorder">
			<div class="pd-20 pt-30 pb-30 clearfix pos-r">
				<div class="contain-part pos-r">
					<div class="experimentMsg boxBorder pl-30 pb-20 pt-10 box-shadow">
						<p class="experimentMsg-name f-24 fc-objGreen fw-bold"><i class="stuEx-icon stuEx-icon-xiangmu fc-objYellow pr-5 fw-normal"></i><span>${experiment.experimentName }</span><span class="f-16"> </span></p>
						<div class="pl-30 fw-bold">
							<div class="experimentMsg-course pt-5 pb-5">
								<span>所属课程: </span>
								<span class="ml-40">${experiment.experimentCourse.courseName}</span>
							</div>
							<div class="experimentMsg-type pt-5 pb-5">
								<span>实验类型: </span>
								<c:if test="${experiment.type == 1}">
								<span class="ml-40">整班上课</span>
								</c:if>
								<c:if test="${experiment.type == 3}">
								<span class="ml-40">自主预约</span>
								</c:if>
							</div>
							<div class="experimentMsg-difficulty pt-5 pb-5">
								<span>实验难度: </span>
								<c:if test="${experiment.level == 1}">
								<span class="fc-objBlue ml-40">容易</span>
								</c:if>
								<c:if test="${experiment.level == 2}">
								<span class="fc-objBlue ml-40">适中</span>
								</c:if>
								<c:if test="${experiment.level == 3}">
								<span class="fc-objBlue ml-40">困难</span>
								</c:if>
							</div>
					
							<div class="experimentMsg-teachers pt-5 pb-5 clearfix">
								<span class="f-l">任课教师: </span>
								<c:forEach items="${ experimentThif}" var="tf">
								<div class="ml-40 f-l">
									<ul>
										<li class="clearfix">
											<div class="teacherAvatar f-l">
												<img src="${RESOURCE_WAY }/${tf.imagePath }" alt="">
											</div>
											<div class="f-l teacherMsg pl-10">
												<p class="f-14">${tf.departMentName}</p>
												<p class="f-16">${tf.teacherName}</p>
											</div>
										</li>
									</ul>
								</div>
							</c:forEach>
							</div>
							<%-- <div class="experimentMsg-time clearfix pt-5 pb-5">
								<span class="f-l">上课时间: </span>
								<span class="f-l ml-40"><fmt:formatDate value="${experiment.schooltime}" pattern="yyyy-MM-dd"/>&nbsp;${experiment.exCourseScheduleByte}</span>
							</div> --%>
							<div class="experimentMsg-contain clearfix pt-5 pb-5">
								<span class="f-l">实验内容: </span>
								<div class="f-l ml-40 f-14">
									<div class="experimentContent">${experiment.experimentPresentation}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="experimentContain mt-20 boxBorder box-shadow bc-white">
						<div class="pd-20">
							<div class="report-part">
								<p class="f-20 fw-bold fc-objBlue pb-10"><i class="stuEx-icon stuEx-icon-yuanqiu fc-objYellow pr-5 fw-normal"></i><span>实验报告</span><span class="f-14 fc-objGreen">[
				
								<c:if test="${not empty ScheduleStudentScore}">
								<c:if test="${ScheduleStudentScore.get(0).submitStatus==1 }">
									报告状态：未提交！
								</c:if>
								<c:if test="${ScheduleStudentScore.get(0).submitStatus==2 }">
									报告状态：待批改!
								</c:if>
								<c:if test="${ScheduleStudentScore.get(0).submitStatus==3 }">
									报告状态：已批改!
								</c:if>
								<c:if test="${ScheduleStudentScore.get(0).submitStatus==4 }">
									报告状态：重做!
								</c:if>
								<c:if test="${ScheduleStudentScore.get(0).submitStatus==5 }">
									报告状态：你已通过手机提交了实验结果图片!
								</c:if>
								<c:if test="${ScheduleStudentScore.get(0).submitStatus==6 }">
									报告状态：报告已保存!
								</c:if>
								</c:if>
								]</span></p>
								<div class="boxBorder pd-15">
									<form action="${ctx }/studentController/submitStudentExperimentScore" method="post" id="reportForm"   enctype="multipart/form-data" class="form form-horizontal">
										<div class="row cl">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold"><!-- <span class="c-red pr-5">*</span> -->报告描述：</label>
											<c:if test="${ScheduleStudentScore.get(0).submitStatus==6 }">
												<div class="formControls col-xs-9 col-sm-10">
													<script id="reportEditor" class="reportEditor" style="width: 100%;">${ScheduleStudentScore.get(0).labReport}</script>
													<textarea id="reportEditorText" name="labReport" id="" cols="30" rows="10" style="display: none;"></textarea>
												</div>
											</c:if>		
											<c:if test="${ScheduleStudentScore.get(0).submitStatus==4 }">
												<div class="formControls col-xs-9 col-sm-10">
													<script id="reportEditor" class="reportEditor" style="width: 100%;">${ScheduleStudentScore.get(0).labReport}</script>
													<textarea id="reportEditorText" name="labReport" id="" cols="30" rows="10" style="display: none;"></textarea>
												</div>
											</c:if>		
											
											<c:if test="${ScheduleStudentScore.get(0).submitStatus==1 }">
												<div class="formControls col-xs-9 col-sm-10">
													<script id="reportEditor" class="reportEditor" style="width: 100%;">${ScheduleStudentScore.get(0).labReport}</script>
													<textarea id="reportEditorText" name="labReport" id="" cols="30" rows="10" style="display: none;"></textarea>
												</div>
											</c:if>	
											<c:if test="${ScheduleStudentScore.get(0).submitStatus==5 }">
												<div class="formControls col-xs-9 col-sm-10">
													<script id="reportEditor" class="reportEditor" style="width: 100%;">${ScheduleStudentScore.get(0).labReport}</script>
													<textarea id="reportEditorText" name="labReport" id="" cols="30" rows="10" style="display: none;"></textarea>
												</div>
											</c:if>	
													
										</div>
										<div class="row cl mt-20 uploadReport">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">实验附件：</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
												<div class="clearfix">
													<div class="f-l uploadReport-path">
														<input type="hidden" name="experimentCourseId" value="${experimentCourseId}"  class="input-text">
														<input type="text" disabled="disabled" id="subProjectFile" class="input-text">
														<!-- 学生id -->
														<input type="hidden" name="submitterId" value="${studentId}"  class="input-text">
														<!-- 当前课程id -->
														<input type="hidden" name="scheduleId" value="${scheduleId }" class="input-text">
														<!-- 实验id -->
														<input type="hidden" name="experimentId" value="${experimentId }" class="input-text">
														<!-- 实验室id -->
														<input type="hidden" name="labId" value="${labId}" class="input-text">
														<!--DTO 参数  -->
														<input type="hidden" name="studentName"  value="${studentInfo.name}">
														<input type="hidden" name="experimentName"  value="${experiment.experimentName }">
														<input type="hidden" name="experimentCourseName" value="${experiment.experimentCourse.courseName}">
													
														<!-- 考勤信息 -->
														<%-- <c:if test="${not empty experimentLab.mainframeKey}">
														<input type="hidden" name="signin" value="${studenClockingIn.signin}">
														<input type="hidden" name="signinTime" value="${studenClockingIn.signinTime}">
														</c:if> --%>
														<c:if test="${not empty ScheduleStudentScore}">
														<!-- 判断该文件是否提交过 -->	
														<input type="hidden" name="scheduleStudentScoreId" value="${ ScheduleStudentScore.get(0).scheduleStudentScoreId}">					
														<input type="hidden" name="gifFile" value="${ ScheduleStudentScore.get(0).gifFile}">					
														<input type="hidden" name="projectFile" value="${ ScheduleStudentScore.get(0).projectFile}">					
														</c:if>
														
													</div>
													<div class="f-l pos-r uploadReport-btn">
														<span class="btn btn-primary radius">上传实验附件</span>
														<input type="file" name="subProjectFile" class="pos-a" value="">
													</div>
													<p style="clear:both;">多个文件请打成压缩包上传，只支持上传zip、rar、doc、docx 格式文件</p>
												</div>
												<c:if test="${ not empty ScheduleStudentScore.get(0).projectFile}">
													<c:if test="${ScheduleStudentScore.get(0).submitStatus==6 }">
													<div class="reportUploaded-report f-l">
														<a href="${RESOURCE_WAY }${ ScheduleStudentScore.get(0).projectFile}" title="点击下载文件报告">
															<img src="${ctx }/staticfile/student/images/download.png" alt="" style="background-color: #ccc;">
														</a>
														<!-- projectFileHtml  不为空才可以预览 -->
														<c:if test="${ not empty ScheduleStudentScore.get(0).projectFileHtml}">
														<span class="btn-success pl-10 pr-10 radius ml-5" style="cursor: pointer;vertical-align: bottom;" onclick="showStudentReport('${ScheduleStudentScore.get(0).projectFileHtml}','文件预览');">预览</span>
														</c:if>
													</div>
													</c:if>
												</c:if>
												
												<c:if test="${ not empty ScheduleStudentScore.get(0).projectFile}">
													<c:if test="${ScheduleStudentScore.get(0).submitStatus==4 }">
													<div class="reportUploaded-report f-l">
														<a href="${RESOURCE_WAY }${ ScheduleStudentScore.get(0).projectFile}" title="点击下载文件报告">
															<img src="${ctx }/staticfile/student/images/download.png" alt="" style="background-color: #ccc;">
														</a>
														<!-- projectFileHtml  不为空才可以预览 -->
														<c:if test="${ not empty ScheduleStudentScore.get(0).projectFileHtml}">
														<span class="btn-success pl-10 pr-10 radius ml-5" style="cursor: pointer;vertical-align: bottom;" onclick="showStudentReport('${ScheduleStudentScore.get(0).projectFileHtml}','文件预览');">预览</span>
														</c:if>
													</div>
													</c:if>
												</c:if>
												
											</div>
										</div>
										<div class="row cl mt-20 uploadGif">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">实验现象：</label>
											<div class="formControls col-xs-9 col-sm-10">
												<div class="clearfix">
													<div class="f-l uploadGif-path">
														<input type="text" disabled="disabled" class="input-text">
													</div>
													<div class="f-l pos-r uploadGif-btn">
														<span class="btn btn-primary radius">上传实验现象图</span>
														<input type="file" name="subGifFile" class="pos-a">
													</div>
													<div class="f-l pl-5">
														<!-- 下载所需要的截图工具而已 -->
														<a class="a_btn" href="${RESOURCE_WAY}/system_file/tools/gifTools.exe"  >
															<p class="fc-lightBlue btn radius fs-12 mrt-10 cutImg">
																<i class="stuEx-icon pdr-5">&#xe70c;</i>
																<span>截取实验现象图</span>
															</p>
														</a>
														<!-- <span class="btn radius f-l"><i class="stuEx-icon stuEx-icon-x_jiequ pr-5"></i>截取动态图</span> -->
													</div>
													<div class="f-l pl-5">
														<span class="btn radius f-l" onclick="showUploadGif_QR();"><i class="stuEx-icon stuEx-icon-shangchuantupian pr-5"></i>扫码上传</span>
													</div>
													<p style="clear:both;">只支持上传gif、png、jpg格式图片</p>
													<c:if test="${not empty ScheduleStudentScore}">
														<c:if test="${ScheduleStudentScore.get(0).submitStatus == 5}">
															<c:if test="${not empty ScheduleStudentScore.get(0).gifFile}">
															<div class="reportUploaded-gif f-l">
																	<img src="${RESOURCE_WAY }${ScheduleStudentScore.get(0).gifFile}" alt="${ScheduleStudentScore.get(0).gifFile}" style="display:none;">
																<a href="javascript:void(0);" title="点击保存实验结果动态图" class="downloadGif">
																	<img src="${ctx }/staticfile/student/images/download.png" alt="" style="background-color: #ccc;">
																</a>
																<span class="btn-success pl-10 pr-10 radius ml-5" style="vertical-align: bottom;" onclick="showGif();">预览</span>
															</div>
															
															</c:if>
															<p><span class="c-red pr-5">*</span>你已通过手机提交了实验结果图片，请尽快完善你的实验报告，并提交!</p>
															<p><span class="c-red pr-5">*</span>提交时间：<fmt:formatDate value="${ScheduleStudentScore.get(0).updateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
														</c:if>
													</c:if>
												</div>
												<c:if test="${not empty ScheduleStudentScore.get(0).gifFile}">
													<c:if test="${ScheduleStudentScore.get(0).submitStatus == 6}">
														<div class="reportUploaded-gif f-l">
													<img src="${RESOURCE_WAY }${ScheduleStudentScore.get(0).gifFile}" alt="${ScheduleStudentScore.get(0).gifFile}" style="display:none;">
														<a href="javascript:void(0);" title="点击保存实验结果动态图" class="downloadGif">
															<img src="${ctx }/staticfile/student/images/download.png" alt="" style="background-color: #ccc;">
														</a>
														<span class="btn-success pl-10 pr-10 radius ml-5" style="vertical-align: bottom;" onclick="showGif();">预览</span>
														</div>
													</c:if>
												
												</c:if>
												<!-- 重做 -->
													<c:if test="${not empty ScheduleStudentScore.get(0).gifFile}">
													<c:if test="${ScheduleStudentScore.get(0).submitStatus == 4}">
														<div class="reportUploaded-gif f-l">
														<img src="${RESOURCE_WAY }${ScheduleStudentScore.get(0).gifFile}" alt="${ScheduleStudentScore.get(0).gifFile}" style="display:none;">
														<a href="javascript:void(0);" title="点击保存实验结果动态图" class="downloadGif">
															<img src="${ctx }/staticfile/student/images/download.png"" alt="" style="background-color: #ccc;">
														</a>
														<span class="btn-success pl-10 pr-10 radius ml-5" style="vertical-align: bottom;" onclick="showGif();">预览</span>
														</div>
													</c:if>
												
												</c:if>
												
												
											</div>
										</div>
										<div class="row cl mt-20">
											<p class="col-xs-3 col-sm-2"></p>
											<p class="col-xs-9 col-sm-10 clearfix">
											<!-- <button type="submit"></button> -->
												<span class="submitBtn btn btn-primary radius pl-5">提交
												
												</span>
												<span class="saveBtn btn btn-success radius">保存
													<!-- 空即为保存状态 -->
													<input type="hidden" name="submitStatus" value="" id="submitStatus">
												</span>
												<c:if test="${ScheduleStudentScore.get(0).submitStatus==6 }">
												<span style="vertical-align:bottom;">上次保存时间:  <fmt:formatDate value="${ ScheduleStudentScore.get(0).updateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
												</c:if>
											</p>
										</div>
									</form>
									<!-- 已提交报告显示 start -->
									<div class="reportUploaded">
										<!--  -->
										<c:if test="${not empty ScheduleStudentScore}">
										<c:if test="${ScheduleStudentScore.get(0).submitStatus!=6}">
										<div class="row cl">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">报告描述：</label>
											<div class="formControls col-xs-9 col-sm-10">
												<div class="boxBorder pd-5 reportUploaded-experimentText">${ScheduleStudentScore.get(0).labReport}</div>
											</div>
										</div>
										</c:if>
										<div class="row cl mt-20">
										<c:if test="${not empty ScheduleStudentScore.get(0).projectFile}">
											<c:if test="${ScheduleStudentScore.get(0).submitStatus!=6}">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">实验文件：</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
												<div class="reportUploaded-report f-l">
													<a href="${RESOURCE_WAY }${ ScheduleStudentScore.get(0).projectFile}" title="点击下载文件报告">
														<img src="${ctx }/staticfile/student/images/download.png" alt="">
													</a>
													<!-- projectFileHtml  不为空才可以预览 -->
													<c:if test="${not empty ScheduleStudentScore.get(0).projectFileHtml}">
													<p><span class="btn-success pl-10 pr-10 radius ml-5" style="cursor: pointer;" onclick="showStudentReport('${ScheduleStudentScore.get(0).projectFileHtml}','文件预览');">预览</span></p>
													</c:if>
												</div>
											</div>
											</c:if>
										</c:if>
										</div>
										<div class="row cl mt-20">
										<c:if test="${not empty ScheduleStudentScore.get(0).gifFile}">
										<c:if test="${ScheduleStudentScore.get(0).submitStatus!=6}">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">实验结果：</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
												<div class="reportUploaded-gif f-l">
												<img src="${RESOURCE_WAY }${ScheduleStudentScore.get(0).gifFile}" alt="${ScheduleStudentScore.get(0).gifFile}" style="display:none;">
														<a href="javascript:void(0);" title="点击保存实验结果动态图" class="downloadGif">
														<img src="${ctx }/staticfile/student/images/download.png" alt="">
													</a>
													<p><span class="btn-success pl-10 pr-10 radius ml-5" style="cursor: pointer;" onclick="showGif();">预览</span></p>
												</div>
											</div>
										</c:if>
										</c:if>
										</div>
										<div class="row cl mt-20">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">实验成绩：</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
											<c:if test="${ScheduleStudentScore.get(0).score !=null }">
												<p class="fc-objBlue fw-bold"><span>${ ScheduleStudentScore.get(0).score}</span>&nbsp;分</p>
											</c:if>
											<c:if test="${empty ScheduleStudentScore.get(0).score }">
												<p class="fc-objBlue fw-bold"><span>未评分</span>&nbsp;</p>
											</c:if>
											</div>
										</div>
										<div class="row cl mt-20">
										<c:if test="${not empty ScheduleStudentScore.get(0).remark }">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">教师评语：</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
												<div class="boxBorder pd-5">${ ScheduleStudentScore.get(0).remark}</div>
											</div>
										</c:if>	
										<c:if test="${empty ScheduleStudentScore.get(0).remark}">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">教师反馈：</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
												<div class="boxBorder pd-5">暂未批改</div>
											</div>
										</c:if>	
										</div>
										<div class="row cl mt-20">
										<c:if test="${not empty ScheduleStudentScore.get(0).submitTime != null }">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">提交时间：</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
												<p><fmt:formatDate value="${ ScheduleStudentScore.get(0).submitTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
											</div>
										</c:if>	
										<c:if test="${not empty ScheduleStudentScore.get(0).checkTime  }">
											<label class="form-label col-xs-3 col-sm-2 text-r fw-bold">教师批改时间:</label>
											<div class="formControls col-xs-9 col-sm-10 clearfix">
												<p><fmt:formatDate value="${ScheduleStudentScore.get(0).checkTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
											</div>
										</c:if>	
										</div>
										</c:if>
										<!--  -->
									</div>
									<!-- 已提交报告显示 end -->
								</div>
							</div>
							<div class="clearfix mt-20 bottom-part">
								<div class="col-xs-6 col-sm-6 pdl-0">
									<p class="f-20 fw-bold fc-objBlue pb-10"><i class="stuEx-icon stuEx-icon-yuanqiu fc-objYellow pr-5 fw-normal"></i><span>实验资源</span></p>
									<div class="boxBorder">
										<div class="resources-list">
											<ul class="resources-list-each on">
											<!-- 实验下的资源为空 -->
											<c:if test="${empty experimentResourceFile}">
												<li style="height:300px;"><img style="display:block;width:100%;height:100%;" src="${cxt}/staticfile/images/null.png"></li>
											</c:if>
											
											<c:forEach items="${ experimentResourceFile}" var="resource">
												<li class="clearfix mt-5 mb-5 pd-5 bc-f2">
													<p class="f-l fw-bold">
													<c:if test="${resource.type==3}">
														<i class="stuEx-icon stuEx-icon-wendang pr-5 fw-normal doc"></i>
													</c:if>
													<c:if test="${resource.type==2}">
														<i class="stuEx-icon stuEx-icon-shipin pr-5 fw-normal video"></i>
													</c:if>
													<c:if test="${resource.type==1}">
														<i class="stuEx-icon stuEx-icon-tupian1 pr-5 fw-normal pic"></i>
													</c:if>
													<c:if test="${resource.type==4}">
														<i class="stuEx-icon stuEx-icon-fujian pr-5 fw-normal other"></i>
													</c:if>
													<span>${resource.fileName }</span>
													</p>
													<p class="f-r">
														<c:if test="${resource.isDownload==1 }">
														<span class="pl-10 pr-10 btn-primary radius" onclick="download(${resource.fileId });">下载资源</span> 
														</c:if>
														<span class="pl-10 pr-10 btn-success radius" data-title="资源预览" data-href="${ctx }/studentController/preview/${resource.fileId }/${experimentId }" href="javascript:void(0)" onclick="Hui_admin_tab(this)">资源预览</span>
													</p>
												</li>
											</c:forEach>
											</ul>
										</div>
									</div>
								</div>
								<div class="col-xs-6 col-sm-6 pdr-0">
									<p class="f-20 fw-bold fc-objBlue pb-10">
										<i class="stuEx-icon stuEx-icon-yuanqiu fc-objYellow pr-5 fw-normal"></i><span>我的笔记</span>
										<span style="cursor: pointer;" class="fc-objGreen f-14 pt-5" data-href="${ctx }/studentController/JumpInterfaceNotesList/${studentId }/${experimentId}" data-title="实验笔记" href="javascript:void(0)" onclick="Hui_admin_tab(this)">查看更多笔记>></span>
									</p>
									<div class="boxBorder pd-10">
										<ul class="note-list" id="experiment-note-ul">
											<c:if test="${empty studentNotesList}">
												<li style="height:300px;"><img style="display:block;width:100%;height:100%;" src="${cxt}/staticfile/images/null.png"></li>
											</c:if>
											<c:forEach items="${studentNotesList}" var="Notes">
											<li class="note-each pd-5 mb-10 pos-r">
												<a href="javascript:void(0)" class="clearfix" style="display:block;">
													<p class="date f-l">
														<span class="span1 c-white f-12"><fmt:formatDate value="${Notes.createTime }" pattern="yyyy-MM"/></span>
														<span class="span2 fc-objBlue f-20"><fmt:formatDate value="${Notes.createTime }" pattern="dd"/></span>
													</p>
													<p class="noteText fl mrl-5 fs-12">${Notes.notesContent }</p>
												</a>
												<i class="Hui-iconfont Hui-iconfont-close2 f-16 c-red" onclick="delNote(${Notes.studentNotesId },this);"></i>
											</li>
											</c:forEach>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="controlBtn pos-a mb-20">
						<!-- <div class="eachBtn box-shadow boxBorder bc-f2 f-16 fw-bold fc-objBlue mb-10" onclick="showQRCode();">扫码登录</div> -->
						<div class="eachBtn box-shadow boxBorder bc-f2 f-16 fw-bold fc-objBlue mb-10" data-href="${ctx }/studentController/toMyExperimentListPage/${studentInfo.id}" data-title="我的实验" onclick="Hui_admin_tab(this);">我的实验</div>
						<div class="eachBtn box-shadow boxBorder bc-f2 f-16 fw-bold fc-objBlue mb-10" onclick="open_experimentNote();">记录笔记</div>
					</div>
				</div>
				<div class="float-part pos-a">
					<div class="labMsg boxBorder box-shadow fw-bold pd-10 bc-white">
						<div class="labMsg-img">
							<img src="${RESOURCE_WAY }/${experimentLab.labImg}" alt="">
						</div>
						<div class="labMsg-name mt-10 c-white f-16">
							<i  class="stuEx-icon stuEx-icon-yuan11 pr-5 fw-normal"></i>
							<span>${experimentLab.labName}</span>
						</div>
						<p class="fc-objBlue f-14 pt-10"><span class="pr-5">编号: </span><span>${experimentLab.labNumber}</span></p>
						<c:if test="${empty experimentLab.mainframeKey  }">
						<p class="fc-objBlue f-14 pt-10"><span class="pr-5">实验室类型: </span><span>通用实验室</span></p>
						</c:if>
						<c:if test="${not empty experimentLab.mainframeKey}">
						<p class="fc-objBlue f-14 pt-10"><span class="pr-5">实验室类型: </span><span>智慧实验室</span></p>
						</c:if>
						<p class="fc-objBlue f-14 pt-10"><span class="pr-5">工位数: </span><span>${experimentLab.labSeat }</span></p>
						<c:forEach items="${experimentLabManager }" var="mg">
						<p class="fc-objBlue f-14 pt-10"><span class="pr-5">管理员: </span><span>${mg.thManager }</span></p>
						</c:forEach>
					</div>
					<div class="attence mt-20 boxBorder box-shadow bc-white">
						<div class="fc-objBlue f-14 pd-10" style="border-bottom: 1px solid #ccc;">
							<p class="fw-bold">上课时间:</p>
							<div class="text-c fw-bold mb-20">
								<fmt:formatDate value="${experiment.schooltime}" pattern="yyyy-MM-dd"/>&nbsp;${experiment.exCourseScheduleByte}
							</div>
							<p class="fw-bold">上课班级:</p>
							<div class="text-c fw-bold">
							<c:forEach items="${scheduleClassList }"  var="sc">
								<p>${sc.tbClass.name }</p>
							</c:forEach>
								
							</div>
						</div>
						<div class="pd-10">
						<c:if test="${not empty labMachine.clockinId}">
							<p class="fc-objBlue fw-bold">考勤状态:</p>
							<div class="text-c">
							<c:if test="${studenClockingIn.signin eq null }">
								<p class="attence-type f-22 fw-bold c-white bc-ccc">未考勤</p>
								<p class="f-14 fc-objBlue pt-5">考勤时间: 无</p>
							</c:if>
<%-- 							<c:if test="${studenClockingIn.signin == 0 }"> --%>
<!-- 								<p class="attence-type f-22 fw-bold c-white">未考勤</p> -->
<!-- 								<p class="f-14 fc-objBlue pt-5">考勤时间: 无</p> -->
<%-- 							</c:if> --%>
							<c:if test="${studenClockingIn.signin == 1 }">
								<p class="attence-type f-22 fw-bold c-white">已考勤</p>
								<p class="f-14 fc-objBlue pt-5">考勤时间:<fmt:formatDate value="${studenClockingIn.signinTime }" pattern="yyyy-MM-dd HH:mm:ss"/> </p>
							</c:if>
							<c:if test="${studenClockingIn.signin == 2 }">
								<p class="attence-type f-22 fw-bold c-white bc-red">迟到</p>
								<p class="f-14 fc-objBlue pt-5">考勤时间:<fmt:formatDate value="${studenClockingIn.signinTime }" pattern="yyyy-MM-dd HH:mm:ss"/> </p>
							</c:if>
							</div>
							</c:if>
						</div>
						
					</div>
				 	<c:if test="${not empty experimentLab.mainframeKey}">
					<div class="attence mt-20 boxBorder box-shadow bc-white">
							<div class="pd-10">
							<div class="text-c">
							<p class="attence-type f-22 fw-bold c-white"><a href="${PEXPERIMENTOPEN }/page/class_brand/course_schedule?labId=${labId}" title="交流中心"   target="_blank" style="display:block;width:100%;height:100%;color:#fff">查看电子班牌</a></p>
							</div>
						</div>
					</div>
					
					</c:if> 
				</div>
			</div>
		</div>
	</div>

	<div class="experimentNote layui-layer-wrap">
		<div class="dborder pd-5 bc-white">
			<form id="noteForm" method="post" action="${ctx}/studentController/addStudentNotes">
				<input name="studentInfoId" type="hidden" value="${studentId }">
				<input name="relevanceId" type="hidden" value="${experimentId}">
				<input name="noteType" type="hidden" value="">
				<textarea cols="30" id="notesContent" name="notesContent" rows="10" datatype="*" ></textarea>
				<p class="clearfix pb-5 experimentNote-button">
					<span class="f-l c-white noteAddSubBtn" id="noteAddSubBtn">保存</span>
					<span class="f-r c-white" data-href="${ctx }/studentController/JumpInterfaceNotesList/${studentId }/${experimentId}" data-title="实验笔记" href="javascript:void(0)" onclick="Hui_admin_tab(this)">查看更多笔记</span>
				</p>
			</form>
		</div>
	</div>
	<!-- 下载的链接 -->
	<form action="${ctx }/studentController/downLoad" method="get" id="downLoadFile">
		<input type="hidden" name="fileId" value="" id="fileId"/>
	</form>

	<!-- 二维码 -->
	<%-- <div class="bc-white QRCode pd-20">
       <img   src="${SSO_URL}/QRCodeController/getQRCode?originalPath=${PEXPERIMENTOPEN}/page/lab" alt="" style="width:100%;height:100%;display:block;">
    </div> --%>
    <!-- 扫描上传图片 -->
   <%--  <c:if test="${empty submitExperimentFile}">
    <div class="bc-white uploadGif_QR pd-20">
  		<img src="${SSO_URL}/QRCodeController/getQRCodeToUrl?originalPath=${PEXPERIMENTOPEN}/studentController/toExperimentImageUpload?submitterId=${studentId}&scheduleId=${scheduleId}&experimentId=${experimentId}&studentName=${studentInfo.name}&experimentName=${experiment.experimentName }&experimentCourseName=${experiment.experimentCourse.courseName}"  alt="" style="width:100%;height:100%;display:block;">
    </div>
    </c:if> --%>
    <!-- 扫描上传图片 (已经提交再进行修改) -->
       <c:if test="${not empty ScheduleStudentScore}">
    <div class="bc-white uploadGif_QR pd-20">
  		<img src="${SSO_URL}/QRCodeController/getQRCodeToUrl?originalPath=${PEXPERIMENTOPEN}/studentController/toExperimentImageUpload?scheduleStudentScoreId=${ ScheduleStudentScore.get(0).scheduleStudentScoreId}"  alt="" style="width:100%;height:100%;display:block;">
    </div>

    <div class="showImg bc-white pd-20">
    	<img src="${RESOURCE_WAY}${ScheduleStudentScore.get(0).gifFile}" title="" style="display:block;width:100%;">
    </div>
    </c:if>
    <%@include file="../footer.jsp"%>
</body>
<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">
	var ueditFilePath ='${experimentFilePath}';
	var RESOURCE_WAY ='${RESOURCE_WAY}';
</script>
<script type="text/javascript" src="${ctx }/staticfile/student/js/downloadFile.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.config.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx }/staticfile/utf8-jsp/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript">
	$(function () {
	    //防止页面后退
	    history.pushState(null, null, document.URL);
	    window.addEventListener('popstate', function () {
	            history.pushState(null, null, document.URL);
	    });
	})


	var ctx = "${ctx}";
	var ctxUrl = "${PEXPERIMENTOPEN}";
	var uploaded = 0; //是否提交报告 0 -- 未提交  1 -- 已提交
	var submitExperimentFile = '${submitExperimentFile}';
	if('${ScheduleStudentScore[0].submitStatus}' != null || '${ScheduleStudentScore[0].submitStatus}' != '' ){
		if('${ScheduleStudentScore[0].submitStatus}' == 2 || '${ScheduleStudentScore[0].submitStatus}' == 3){
			uploaded = 1;
		}else{
			
		} 	
	}
	if('${status}'!=null || '${status}'!=''){
		if('${status}' == 200){
			layer.msg('提交报告成功!');
		}else if('${status}' == 202){
			layer.msg('${msg}');
		}else{

		}
	}
	
</script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/experimentDetail.js"></script>
</html>