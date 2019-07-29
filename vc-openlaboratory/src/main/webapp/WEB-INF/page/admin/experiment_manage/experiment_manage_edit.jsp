<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ueditFilePath" value="${FILE_PATH }/${experiment.experimentInstructorBag}" scope="session"/>
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
	<title>修改实验步骤</title>
</head>

<body>
	<div style="display:none;" class="AOE" pagestyle="1"></div>
	<form action="${ctx }/experimentController/updateExperiment/${menuParam }" method="post" class="form form-horizontal" id="form-experimentManage-edit">
		<div class="page-container">
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属课程：</label>
				<div class="formControls col-xs-8 col-sm-8">
			<%-- 	<input type="hidden" name="menuParam" value="${menuParam }"> --%>
					<div>
						<select name="experimentCourseId" disabled="disabled" datatype="* select" class="select select-box">
						   <c:choose>
						       <c:when test="${empty courseList}">
						          <option value="">无实验课程信息,请先添加实验课程</option>
						       </c:when>
						       <c:otherwise>
						            <c:forEach items="${courseList}" var="course">
								          <option value="${course.experimentCourseId }" <c:if test="${experimentCourse.experimentCourseId eq course.experimentCourseId }">selected="selected"</c:if> >${course.courseName }</option>
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
						<input type="hidden" name="experimentId" value="${experiment.experimentId }">
						<input type="hidden" name="authorId" value="${experiment.authorId}"/>
						<input type="text" class="input-text" name = "experimentName" value="${experiment.experimentName }" placeholder="请填写实验名称!" id="param" name="experimentName" datatype="*" nullmsg="请输入实验名称！" errormsg="实验名称不可用！请重新输入"/>
						<input type="hidden" name="experimentInstructorBag" value="${experiment.experimentInstructorBag }">
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<!-- 指定实物实验 -->
			<input type="hidden" name="experimentType" value="3"  >
		<%-- 	<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验类型：</label>
				<div class="formControls col-xs-8 col-sm-8 pr-30">
					<div>
					 <c:choose>
					      <c:when test="${cookie.systemIdentify.value eq 1 }">
					           <label>
					              <input type="radio" name="experimentType" value="2"  <c:if test="${experiment.experimentType eq 2}">checked="checked"</c:if> ><span>参考实验</span>
					            </label>
									&nbsp;
								<label>
					              <input type="radio" name="experimentType" value="1" <c:if test="${experiment.experimentType eq 1}">checked="checked"</c:if> ><span>虚拟实验</span>
					             </label>
					      </c:when>
					      <c:otherwise>
					            <label>
					              <input type="radio" name="experimentType" value="2"  <c:if test="${experiment.experimentType eq 2}">checked="checked"</c:if> ><span>参考实验</span>
					            </label>
									&nbsp;
							     <label>
					               <input type="radio" name="experimentType" value="3" <c:if test="${experiment.experimentType eq 3}">checked="checked"</c:if> ><span>课堂实验</span>
					            </label>
					      </c:otherwise>
					    </c:choose>
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div> --%>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>难易程度：</label>
				<div class="formControls col-xs-8 col-sm-8 pr-30">
					<div>
						<label>
			              <input type="radio" name="level" value="1" <c:if test="${experiment.level eq 1}">checked="checked"</c:if> ><span>容易</span>
			             </label>
			             &nbsp;
			            <label>
			              <input type="radio" name="level" value="2" <c:if test="${experiment.level eq 2}">checked="checked"</c:if> ><span>适中</span>
			            </label>
			            &nbsp;
			            <label>
			              <input type="radio" name="level" value="3"  <c:if test="${experiment.level eq 3}">checked="checked"</c:if> ><span>困难</span>
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
						<input type="text" class="input-text" value="${experiment.needHour }" placeholder="请填写实验课时!" id="needHour" name="needHour" datatype="n" nullmsg="请输入课时" errormsg="只能填写对应的数字!">
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验要求/内容：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<script id="experimentEditor" class="experimentEditor" name="experimentPresentation" style="width: 100%;" type="text/plain">${experiment.experimentPresentation}</script>
				</div>
			</div>
		<!-- 	<div class="row cl">
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
					<!-- <button onClick="sPE.submit();" class="btn radius btn-primary" type="button"><i class="Hui-iconfont pr-10">&#xe716;</i>添加</button> -->
					<button type="button" class="submitBtn btn btn-primary radius">修改实验</button>
				
				</div>
			<!-- 	<div class="row cl">
				<p class="col-xs-3 col-sm-2"></p>
				<p class="col-xs-9 col-sm-9 text-r"><span class="submitBtn btn btn-primary radius">修改实验</span></p>
			</div> -->
			</div>
		</div>
	</form>
</body>
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>

<script type="text/javascript">
if('${status}'=='200'){
	layer.confirm('<span style="font-size:20px;">请问需要继续修改吗？</span>', {
		 area:['498px','auto'],
		  title:'修改成功',
		  btn: ['继续修改','修改完毕'] //按钮
		},function(index){
			layer.close(index);
		},function(index){
			window.parent.location.reload();
		}
	);
}
var realPath='${ctx}';
//编辑器，图片上传展示需要的参数
var RESOURCE_WAY ='${RESOURCE_WAY}';
var ueditFilePath = '${experiment.experimentInstructorBag}';
</script>

<script type="text/javascript" src="${ctx }/staticfile/js/jquery.step.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.config.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx }/staticfile/utf8-jsp/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/js/experiment_manage_update.js"></script>
</html>