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
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experimentManageAdd.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/jquery.step.css">
	<title>修改实验步骤</title>
</head>

<body>
	<div style="display:none;" class="AOE" pagestyle="1"></div>
	<div class="step-nav cl pt-20">
		<div class="col-sm-2"></div>
		<div class="col-sm-8" id="step"></div>
		<div class="col-sm-2"></div>
	</div>
	<div class="step-page step-page1">
		<form action="${ctx }/experimentController/updateExperiment/${menuParam }" method="post" class="form form-horizontal" id="form-experimentManage-edit">
			<div class="page-container">
				<div class="row cl">
					<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属课程：</label>
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<select name="experimentCourseId" datatype="* select">
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
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<input type="hidden" name="experimentId" value="${experiment.experimentId }">
							<input type="hidden" name="authorId" value="${experiment.authorId}"/>
							<input type="text" class="input-text" value="${experiment.experimentName }" placeholder="请填写实验名称!" id="param" name="experimentName" datatype="*" nullmsg="请输入实验名称！" errormsg="实验名称不可用！请重新输入"/>
						</div>
						<div class="cl">
							<span class="Validform_checktip"></span>
						</div>
					</div>
				</div>
				<div class="row cl">
					<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验类型：</label>
					<div class="formControls col-xs-8 col-sm-6 pr-30">
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
				</div>
				<div class="row cl">
					<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>难易程度：</label>
					<div class="formControls col-xs-8 col-sm-6 pr-30">
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
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<input type="text" class="input-text" value="${experiment.needHour }" placeholder="请填写实验课时!" id="" name="needHour" datatype="n" nullmsg="请输入课时" errormsg="只能填写对应的数字!">
						</div>
						<div class="cl">
							<span class="Validform_checktip"></span>
						</div>
					</div>
				</div>
				<div class="row cl">
					<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验介绍：</label>
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<textarea name="experimentPresentation" cols="" rows="" class="textarea"  placeholder="请输入实验介绍.." datatype="*0-500" dragonfly="true" nullmsg="实验介绍不能为空！" onKeyUp="$.Huitextarealength(this,500)" ignore="ignore">${experiment.experimentPresentation}</textarea>
							<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
						</div>
						<div class="cl">
							<span class="Validform_checktip"></span>
						</div>
					</div>
				</div>
				<div class="row cl">
					<label class="col-xs-3 col-sm-3 pn-0 text-r">拓展实验：</label>
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<textarea name="expandContext" cols="" rows="" class="textarea"  placeholder="请输入拓展实验内容.." datatype="*" dragonfly="true" onKeyUp="$.Huitextarealength(this,500)" ignore="ignore">${experiment.expandContext }</textarea>
							<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
						</div>
						<div class="cl">
							<span class="Validform_checktip"></span>
						</div>
					</div>
				</div>
				<div class="row cl">
					<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5"></span>自定义标识：</label>
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<input type="text" class="input-text" value="${experiment.keyword }" placeholder="为方便查询,请填写自定义标识!" id="" name="keyword">
						</div>
						<div class="cl">
							<span class="Validform_checktip"></span>
						</div>
					</div>
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<input type="hidden" value="1">
						<button class="btn radius" type="button" onclick="sPEE.pageSubmit(0);"><i class="iconfont"></i>保存</button>
						<button class="btn radius" type="button" onclick=""><i class="iconfont"></i>取消</button>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="step-page step-page2">
		<form action="${ctx }/experimentStepController/updateExperimentStepByExperimentId/${menuParam}/${experiment.experimentId}" class="form form-horizontal" method="post" id="form-experimentStep-edit">
			<input type="hidden" name="filePath" value="${experiment.experimentInstructorBag }"/>		
			<div class="col-sm-2 col-xs-1"></div>
			<div class="col-sm-8 col-xs-10 pd-20">
				<ul>
					<c:choose>
						<c:when test="${empty experimentStepList }">
							<li class="eachStep" steporder="0">
								<div class="div fs-16 bc-white cl">
									<p class="stepSign fl" onclick="sPE.slideStep(this);">
										<i class="Hui-iconfont fc-darkGreen pdl-5 pdr-5 fs-18" style="cursor:pointer;">&#xe698;</i><span class="fw-bold pdl-10 pdr-10 fc-white fs-14 bc-darkBlue radius">步骤1</span>
									</p>
									<p class="controlBtn fr">
										<i class="Hui-iconfont fc-green" onclick="sPE.addStep(this);">&#xe604;</i>
									</p>
								</div>
								<div style="clear:both;"></div>
								<div class="stepContext pd-10 bc-gray">
									<div>
										<p>标题: </p>
										<p>
											<input type="hidden" class="stepNum" name="experimentSteps[0].stepNum" value="0">
											<input type="text" class="input-text steptitlename" name="experimentSteps[0].title">
										</p>
									</div>
									<div class="stepContainer">
										<div class="step-contain-editor">
											<p>内容: </p>
											<script id="step-editor-0" class="step-editor-content" style="width: 100%;"></script>
										</div>
										<div class="step-plainTxt" style="display:none;">
											<textarea class="textarea-content1 yourtext" name="contentTextList"></textarea>
											<textarea  class="textarea-content2" name="contentList" ></textarea>
										</div>
									</div>
								</div>
							</li>
							<li class="slideEnd">
							</li>
						</c:when>
						<c:otherwise>
							<c:forEach items="${experimentStepList}" var="experimentStep" varStatus="var">
								<li class="eachStep" steporder="${var.index }">
									<div class="div fs-16 bc-white cl">
										<p class="stepSign fl" onclick="sPE.slideStep(this);">
											<i class="Hui-iconfont fc-darkGreen pdl-5 pdr-5 fs-18" style="cursor:pointer;">&#xe698;</i><span class="fw-bold pdl-10 pdr-10 fc-white fs-14 bc-darkBlue radius">步骤${var.index+1}</span>
										</p>
										<p class="controlBtn fr">
											<i class="Hui-iconfont fc-green" onclick="sPE.addStep(this);">&#xe604;</i><i class="Hui-iconfont fc-red" onclick="sPE.removeStep(this,${var.index});">&#xe60b;</i>
										</p>
									</div>
									<div style="clear:both;"></div>
									<div class="stepContext pd-10 bc-gray">
										<div>
											<p>标题: </p>
												<input type="hidden" value="${experimentStep.stepId }" name="experimentSteps[${var.index}].stepId"/>
												<input class="stepNum" type="hidden" name="experimentSteps[${var.index }].stepNum" value="${var.index}">
											<p><input type="text" class="input-text steptitlename" value="${experimentStep.title }" name="experimentSteps[${var.index}].title"></p>
										</div>
										<div class="stepContainer">
											<div class="step-contain-editor">
												<p>内容: </p>
												<script id="step-editor-${var.index }" class="step-editor-content" style="width: 100%;">${experimentStep.content}</script>
											</div>
											<div class="step-plainTxt" style="display:none;">
												<textarea name="contentTextList" class="textarea-content1 step-yourtext">${experimentStep.contentText }</textarea>
												<textarea  class="textarea-content2" name="contentList" >${experimentStep.content}</textarea>
											</div>
										</div>
									</div>
								</li>
							</c:forEach>
						</c:otherwise>
					
					</c:choose>
					<li class="slideEnd"></li>
				</ul>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<input type="hidden" value="2">
						<button class="nBtn2 btn radius" type="button" onclick="sPEE.pageSubmit(1);"><i class="iconfont"></i>保存</button>
						<button class="btn radius" type="button" onclick=""><i class="iconfont"></i>取消</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</form>
	</div>
	<div class="step-page step-page3">
		<form action="${ctx }/experimentController/updateExperimentMubanToEdit/${menuParam}" method="post" class="form form-horizontal" id="form-experimentTemplate-edit">
			<input name="experimentId" type="hidden" value="${experiment.experimentId }"/>
			<div class="col-sm-2 col-xs-1"></div>
			<div class="col-sm-8 col-xs-10 pd-20">
				<div class="reportTemplate">
					<div class="templateTips f-12">
						<p style="color: red">
							<span>温馨提示:</span>
							<span>若需要实现实验报告模板自动批改功能,请按下面格式来添加实验报告模板，若不需要，则不用;</span>
						</p>
						<p style="color: blue">
							<span style="display:block;" class="fl">提示:</span>
							<span style="display:block;padding-left:40px;"> 
								1.为了实现系统智能批改，需要系统识别以下特殊字符：”#[”   ”]#”  ”~”<br>
								2.需要学生填写的空格，请用”#[”和”]#”扩起来，如：”#[5]#”;<br>
								3.若是浮动的约数，可以在约数的取值区间用”~”区分开。如答案取值在4到4.5：“#[4~4.5]#”<br>
								4.特别声明：扩起答案的特殊字符是半角的英文字符，特殊字符之间是答案，请不要在答案之间添加其他特殊字符。特别是“#”、“]”、“[”、“~”、无意义的空格等<br>
							</span>
						</p>
					</div>
					<div class="templateDetail">
						<script id="templateDetail" style="width:100%;">${experiment.experimentInstructor}</script>
					</div>
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<input type="hidden" value="3">
						<button class="nBtn3 btn radius" type="button" onclick="sPEE.pageSubmit(2);"><i class="iconfont"></i>保存</button>
						<button class="btn radius" type="button" onclick=""><i class="iconfont"></i>取消</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</form>
	</div>
	<div class="step-page step-page4">
		<form action="${ctx }/experimentFileController/setExperimentAnswerAndInstrutor/${experiment.experimentId}/${menuParam}" class="form form-horizontal" method="post" enctype="multipart/form-data"  id="form-experimentTemolate-edit">
			<div class="col-sm-2 col-xs-1"></div>
			<div class="col-sm-8 col-xs-10 pd-20">
				<div style="padding-top: 60px;">
						
							<div class="row cl">
								<label class="col-xs-3 col-sm-3 pn-0 text-r f-16"><span class="c-red pr-5">*</span>实验指导书：</label>
								<div class="formControls col-xs-8 col-sm-8 pr-30">
									<c:forEach  items="${instrutor }" var="r">
										${r.fileName }&nbsp;&nbsp;
									</c:forEach>
									<div>
										<input type="file" name="instructorFile" class="experiment-instructor input-text" style="padding-bottom: 30px;">
									</div>
								</div>
							</div>
						<div class="row cl">
							<label class="col-xs-3 col-sm-3 pn-0 text-r f-16"><span class="c-red pr-5">*</span>实验标准答案：</label>
							<div class="formControls col-xs-8 col-sm-8 pr-30">
								<c:forEach  items="${answer }" var="a">
										${a.fileName }&nbsp;&nbsp;
									</c:forEach>
								<div>
									<input type="file" name="answerFile" class="experiment-trueAnswer input-text" style="padding-bottom: 30px;">
								</div>
							</div>
						</div>
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<input type="hidden" value="4">
						<button class="nBtn4 btn radius" type="button" onclick="sPEE.pageSubmit(3);"><i class="iconfont"></i>保存</button>
						<button class="btn radius" type="button" onclick=""><i class="iconfont"></i>取消</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</form>
	</div>
	<div class="step-page step-page5">
		<form action="${ctx}/experimentStandardController/editByExperimentId/${menuParam}/${experiment.experimentId}" method="post" class="form form-horizontal" id="form-experimentStandaerd-edit">
			<input name="standardIdentify" type="hidden" value="${experiment.standardIdentify }"/>		
			<div class="col-sm-2 col-xs-1"></div>
			<div class="col-sm-8 col-xs-10">
				<div class="standardTable pl-30">
					<table>
						<thead>
								<tr>
									<td class="text-c" width="30">序号</td>
									<td class="text-c" width="120">报告内容</td>
								<td class="text-c" width="120">成绩评定标准</td>
									<td class="text-c" width="30">得分</td>
								</tr>
						</thead>
						<tbody>
							<c:choose>
								<c:when test="${empty  experimentStandardList}">
									<tr class="eachStandard">
										<td width="30" class="text-c standardOrder">
											<span>1</span>
											<i class="add Hui-iconfont c-green" onclick="sPE.addStandard(this);">&#xe604;</i>
											<i class="del Hui-iconfont c-red" onclick="sPE.delStandard(this);">&#xe706;</i>
										</td>
										<td width="120" class="text-r">
											<input type="hidden" class="standard-number" name="experimentStandards[0].number" value="0"/>
											<textarea name="experimentStandards[0].standTitle" id="" class="standard-standTitle"></textarea>
										</td>
										<td width="120" class="text-r">
											<textarea name="experimentStandards[0].presentation" id="" class="standard-presentation"></textarea>
										</td>
										<td width="30" class="text-c">
											<input type="text" class="text-c standards-score" name="experimentStandards[0].score" value="">
										</td>
									</tr>
								</c:when>
								<c:otherwise>
									<c:forEach items="${experimentStandardList }" var="standard" varStatus="var">
										<tr class="eachStandard">
											<td width="30" class="text-c standardOrder">
												<span>${var.index+1 }</span>
												<i class="add Hui-iconfont c-green" onclick="sPE.addStandard(this);">&#xe604;</i>
												<i class="del Hui-iconfont c-red" onclick="sPE.delStandard(this);">&#xe706;</i>
											</td>
											<td width="120" class="text-r">
												<input type="hidden" class="standard-number" name="experimentStandards[${var.index }].number" value="${var.index }"/>
												 <input type="hidden" name="experimentStandards[${var.index }].standardId" value="${standard.standardId }"/>
												<textarea name="experimentStandards[${var.index }].standTitle" id="" class="standard-standTitle">${standard.standTitle }</textarea>
											</td>
											<td width="120" class="text-r">
												<textarea name="experimentStandards[${var.index }].presentation" id="" class="standard-presentation">${standard.presentation }</textarea>
											</td>
											<td width="30" class="text-c">
												<input type="text" class="text-c standards-score" name="experimentStandards[${var.index }].score" value="${standard.score}">
											</td>
										</tr>
									</c:forEach> 
								</c:otherwise>
							</c:choose>
						</tbody>
					</table>
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<input type="hidden" value="5">
						<button class="nBtn5 btn radius" type="button" onclick="sPEE.pageSubmit(4);"><i class="iconfont"></i>保存</button>
						<button class="btn radius" type="button" onclick=""><i class="iconfont"></i>取消</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</form>
	</div>
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
<script type="text/javascript" src="${ctx }/staticfile/js/stepPage.js"></script>
<script>
	$(function(){
		$step.WResize();
		sPEE.prototype.init();
		sPE.initOtherEditor('templateDetail');
		for(var i=0;i<$('.ui-step-item-num').length;i++){
			$('.ui-step-item-num').eq(i).children('span').attr('onclick','onPage('+i+')').css('cursor','pointer');
		}
		$('.stepContext').each(function(){
			$('.stepContext').eq(0).show();
		})
	})
</script>
</html>