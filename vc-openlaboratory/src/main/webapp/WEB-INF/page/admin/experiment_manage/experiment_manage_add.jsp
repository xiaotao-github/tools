<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ueditFilePath" value="${FILE_PATH }/${experimentFilePath}" scope="session"/>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/public.css">
	<link href="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
	<title>添加实验步骤</title>
</head>
<body>
	<div style="display:none;" class="AOE" pagestyle="0"></div>
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验管理 <span class="c-gray en">&gt;</span> 
		<c:if test="${menuParam==1}">
		所有实验
		</c:if>
		<c:if test="${menuParam==2}">
		院系实验
		</c:if>
		<c:if test="${menuParam==3}">
		我的实验
		</c:if>
		<span class="c-gray en">&gt;</span> 
		添加所属课程：${courseName}的实验
		<!-- <a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a> -->
	</div>
	<form  action="${ctx }/experimentController/addExperiment" method="post" enctype="multipart/form-data" class="form form-horizontal" id="form-experimentManage-add">
		<input type="hidden" name="authorId" value="${teacherInfo.id }"/>
		<input type="hidden" name="experimentInstructorBag" value="${experimentFilePath }">
		<input type="hidden" name="menuParam" value="${menuParam }">
		<div class="page-container">
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属课程：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<div>
						<!-- <select id = "experimentCourseId" name="experimentCourseId" class="select-box" datatype="* select"> -->
						<select name="experimentCourseIds" disabled="disabled" datatype="* select" class="select select-box">
						   <c:choose>
						       <c:when test="${empty courseList}">
						          <option value="">无实验课程信息,请通知管理员添加实验课程</option>
						       </c:when>
						       <c:otherwise>
						            <c:forEach items="${courseList}" var="course">
								       <%--    <option value="${course.experimentCourseId }">${course.courseName }</option> --%>
								          <option value="${course.experimentCourseId }" <c:if test="${experimentCourseId eq course.experimentCourseId }">selected="selected"</c:if> >${course.courseName }</option>
							        </c:forEach>
						       </c:otherwise>
						   </c:choose>
						</select>
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验名称：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<div>
						<input type="text" class="input-text" value="" placeholder="请填写实验名称!" id="param" name="experimentName" datatype="*" nullmsg="请输入实验名称！" errormsg="实验名称不可用！请重新输入"><!--ajaxurl="${ctx}/majorController/validateMajorNumberById/-1"  -->
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<!-- 指定课程的名称 -->
			<input type="hidden" name="courseName" value="${courseName}"  >
			<!-- 指定实验课程的Id -->
			<input type="hidden" name="experimentCourseId" value="${experimentCourseId}"  >
			<!-- 指定实物实验 -->
			<input type="hidden" name="experimentType" value="3"  >
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>难易程度：</label>
				<div class="formControls col-xs-8 col-sm-8 pr-30">
					<div>
						<label>
			              <input type="radio" name="level" value="1" checked="checked"><span>容易</span>
			             </label>
			             &nbsp;
			            <label>
			              <input type="radio" name="level" value="2"><span>适中</span>
			            </label>
			            &nbsp;
			            <label>
			              <input type="radio" name="level" value="3"><span>困难</span>
			            </label>
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验课时：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<div>
						<input type="text" class="input-text" value="" placeholder="请填写实验课时!" id="needHour" name="needHour" datatype="n" nullmsg="请输入课时" errormsg="只能填写对应的数字!">
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验要求/内容：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<script id="experimentEditor"  name="experimentPresentation" class="experimentEditor" style="width: 100%;"></script>
				</div>
			</div>
		<!--  取消 webuploader 上传  改为 from 表单 	
		<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r">实验资源：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<div class="uploader-list-container"> 
						<div class="queueList">
							<div id="dndArea" class="placeholder">
								<div id="filePicker-2"></div>
								<p>或将文件拖到这里，单次最多可选300张</p>
							</div>
						</div>
						<div class="statusBar" style="display:none;">
							<div class="progress"> <span class="text">0%</span> <span class="percentage"></span> </div>
							<div class="info"></div>
							<div class="btns">
								<div id="filePicker2"></div>
								<div class="uploadBtn">开始上传</div>
							</div>
						</div>
					</div>
				</div>
			</div> -->
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"></label>
				 <div class="col-xs-8 col-sm-8 cl">
					<button onClick="" class="btn radius" type="button"><i class="Hui-iconfont pr-10">&#xe6dd;</i>取消</button>
					<!--  onClick="sPE.submit();" -->
					<!-- <button class="btn radius btn-primary" type="submit"><i class="Hui-iconfont pr-10">&#xe716;</i>添加实验</button> -->
					<button type="button" class="submitBtn btn btn-primary radius">添加实验</button>
				</div> 
			</div>
		</div>
	</form>
</body>

<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>

<script type="text/javascript">

var realPath='${ctx}';
//编辑器，图片上传展示需要的参数
var RESOURCE_WAY ='${RESOURCE_WAY}';
var ueditFilePath = '${experimentFilePath}';
</script>

<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.config.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx }/staticfile/utf8-jsp/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/js/experiment_manage_add.js"></script>
</html>