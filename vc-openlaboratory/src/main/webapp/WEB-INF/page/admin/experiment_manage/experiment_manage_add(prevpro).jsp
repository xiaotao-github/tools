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
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experimentManageAdd.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/jquery.step.css">
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
		添加实验
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>
	<div class="step-nav cl pt-20">
		<div class="col-sm-2"></div>
		<div class="col-sm-8" id="step"></div>
		<div class="col-sm-2"></div>
	</div>
	<form action="${ctx }/experimentController/addExperiment" method="post" enctype="multipart/form-data" class="form form-horizontal" id="form-experimentManage-add">
		<input type="hidden" name="authorId" value="${teacherInfo.id }"/>
		<input type="hidden" name="experimentInstructorBag" value="${experimentFilePath }">
		<input type="hidden" name="menuParam" value="${menuParam }">
		<div class="step-page step-page1">
			<div class="page-container">
				<div class="row cl">
					<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属课程：</label>
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<select name="experimentCourseId" class="select-box" datatype="* select">
							   <c:choose>
							       <c:when test="${empty courseList}">
							          <option value="">无实验课程信息,请先添加实验课程</option>
							       </c:when>
							       <c:otherwise>
							            <c:forEach items="${courseList}" var="course">
									          <option value="${course.experimentCourseId }">${course.courseName }</option>
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
							<input type="text" class="input-text" value="" placeholder="请填写实验名称!" id="param" name="experimentName" datatype="*" nullmsg="请输入实验名称！" errormsg="实验名称不可用！请重新输入"><!--ajaxurl="${ctx}/majorController/validateMajorNumberById/-1"  -->
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
						              <input type="radio" name="experimentType" value="2"  checked="checked"><span>参考实验</span>
						            </label>
										&nbsp;
									<label>
						              <input type="radio" name="experimentType" value="1" ><span>虚拟实验</span>
						             </label>
						      </c:when>
						      <c:otherwise>
						            <label>
						              <input type="radio" name="experimentType" value="2"  checked="checked"><span>参考实验</span>
						            </label>
										&nbsp;
								     <label>
						               <input type="radio" name="experimentType" value="3" ><span>课堂实验</span>
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
					<div class="formControls col-xs-8 col-sm-6">
						<div>
							<input type="text" class="input-text" value="" placeholder="请填写实验课时!" id="" name="needHour" datatype="n" nullmsg="请输入课时" errormsg="只能填写对应的数字!">
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
							<textarea name="experimentPresentation" cols="" rows="" class="textarea"  placeholder="请输入实验介绍.." datatype="*" dragonfly="true" nullmsg="实验介绍不能为空！" onKeyUp="$.Huitextarealength(this,500)"></textarea>
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
							<textarea name="expandContext" cols="" rows="" class="textarea"  placeholder="请输入拓展实验内容.." datatype="*" dragonfly="true" onKeyUp="$.Huitextarealength(this,500)" ignore="ignore"></textarea>
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
							<input type="text" class="input-text" value="" placeholder="为方便查询,请填写自定义标识!" id="" name="keyword">
						</div>
						<div class="cl">
							<span class="Validform_checktip"></span>
						</div>
					</div>
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<button class="nBtn1 btn radius" type="button"><i class="iconfont"></i>下一步</button>
					</div>
				</div>
			</div>
		</div>
		<div class="step-page step-page2">
			<div class="col-sm-2 col-xs-1"></div>
			<div class="col-sm-8 col-xs-10 pd-20">
				<ul>
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
									<textarea class="textarea-content2" name="contentList" ></textarea>
								</div>
							</div>
						</div>
					</li>
					<li class="slideEnd">
					</li>
				</ul>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<button onClick="changePage(0)" class="btn radius" type="button"><i class="iconfont"></i>上一步</button>
						<button onClick="changePage(2)" class="btn radius" type="button"><i class="iconfont"></i>下一步</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</div>
		<div class="step-page step-page3">
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
						<script id="templateDetail" name="experimentInstructor" style="width:100%;"></script>
					</div>
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<button onClick="changePage(1)" class="btn radius" type="button"><i class="iconfont"></i>上一步</button>
						<button onClick="changePage(3)" class="btn radius" type="button"><i class="iconfont"></i>下一步</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</div>
		<div class="step-page step-page4">
			<div class="col-sm-2 col-xs-1"></div>
			<div class="col-sm-8 col-xs-10 pd-20">
				<div style="padding-top: 60px;">
					<div class="row cl">
						<label class="col-xs-3 col-sm-3 pn-0 text-r f-16"><span class="c-red pr-5">*</span>实验指导书：</label>
						<div class="formControls col-xs-8 col-sm-8 pr-30">
							<div>
							   <label><input type="file" name="instructorFile" class="experiment-instructor input-text" style="padding-bottom: 30px;"><span style="color:red">仅支持doc、docx文件格式</span></label>
							</div>
						</div>
					</div>

					<div class="row cl">
						<label class="col-xs-3 col-sm-3 pn-0 text-r f-16"><span class="c-red pr-5">*</span>实验标准答案：</label>
						<div class="formControls col-xs-8 col-sm-8 pr-30">
							<div>
								<label><input type="file" name="answerFile" class="experiment-trueAnswer input-text" style="padding-bottom: 30px;"><span class="" style="color:red">仅支持doc、docx文件格式</span></label>
							</div>
						</div>
					</div>
					
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<button onClick="changePage(2)" class="btn radius" type="button"><i class="iconfont"></i>上一步</button>
						<button onClick="changePage(4)" class="btn radius" type="button"><i class="iconfont"></i>下一步</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</div>
		<div class="step-page step-page5">
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
							<tr class="eachStandard">
								<td width="30" class="text-c standardOrder">
									<span>1</span>
									<i class="add Hui-iconfont c-green" onclick="sPE.addStandard(this);">&#xe604;</i>
									<!-- <i class="del Hui-iconfont c-red" onclick="sPE.delStandard(this);">&#xe706;</i> -->
								</td>
								<td width="120" class="text-r">
									<input name="experimentStandards[0].number" class="standard-number" type="hidden"  value="0"/>
									<textarea name="experimentStandards[0].standTitle" class="standard-standTitle" id=""></textarea>
								</td>
								<td width="120" class="text-r">
									<textarea name="experimentStandards[0].presentation" class="standard-presentation" id=""></textarea>
								</td>
								<td width="30" class="text-c">
									<input type="text" class="text-c standards-score"  name="experimentStandards[0].score">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="row cl">
					<div class="col-xs-12 col-sm-12 text-c cl">
						<button onClick="changePage(3)" class="btn radius" type="button"><i class="iconfont"></i>上一步</button>
						<button onClick="sPE.submit();" class="btn radius" type="button"><i class="iconfont"></i>添加</button>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-xs-1"></div>
		</div>
	</form>
</body>

<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>

<script type="text/javascript">
if('${status}'=='200'){
	
	layer.confirm('<span style="font-size:20px;">新添加的实验需要刷新一下页面才可以看到哦~</span>', {
		 area:['498px','auto'],
		  title:'添加成功',
		  btn: ['我知道了,谢谢'] //按钮
		}
	);
}


var realPath='${ctx}';
//编辑器，图片上传展示需要的参数
var RESOURCE_WAY ='${RESOURCE_WAY}';
var ueditFilePath = '${experimentFilePath}';
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
		sPE.init();
		sPE.initOtherEditor('templateDetail');
		$('.stepContext').each(function(){
			$('.stepContext').eq(0).show();
		})
	})
</script>
</html>