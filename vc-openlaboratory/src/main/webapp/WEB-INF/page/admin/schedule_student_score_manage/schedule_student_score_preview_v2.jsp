<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ueditFilePath" value="${FILE_PATH }/${scheduleStudentScore.courseSchedule.experiment.experimentInstructorBag}" scope="session"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/submit_experiment_preview_v2.css">
<script src=”http://html5shiv.googlecode.com/svn/trunk/html5.js”></script>
<style>
	.stuInfoTable{}
	.tablePart .stuInfoTable{width:100%;border: 1px solid #ddd;border-right: none;border-bottom: none;border-collapse: collapse;}
	.tablePart .stuInfoTable tr{height: 35px;padding: 0;border: none;text-align:center;}
	.tablePart .stuInfoTable tr td{border: 1px solid #ddd;border-left: none;border-top: none;font-size: 14px;}
	.hide_Validform{
		display: none !important;
	}
</style>
<title>实验批阅</title>
</head>
<body>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		成绩管理 <span class="c-gray en">&gt;</span> 
		<c:if test="${menuParam==1}">
		所有学生实验成绩
		</c:if>
		<c:if test="${menuParam==2}">
		院系学生实验成绩
		</c:if>
		<c:if test="${menuParam==3}">
		我的学生实验成绩
		</c:if>
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</nav>
	<div class="container">
		<div class="submit-title">
			<p class="titlePart f-20 pt-10 pb-10 mt-20 bk-gray bg-1 radius">
				<c:choose>
					<c:when test="${scheduleStudentScore.submitStatus==4 }"><span class="status status4 c-white pr-10">[重做中]</span></c:when>
					<c:when test="${scheduleStudentScore.submitStatus==3 }"><span class="status status3 c-white pr-10">[已批改]</span></c:when>
					<c:when test="${scheduleStudentScore.submitStatus==2 }"><span class="status status2 c-white pr-10">[待批改]</span></c:when>
					<c:otherwise>
						<span class="status status1 c-white pr-10">[进行中]</span>
					</c:otherwise>
				</c:choose>
				<span>${scheduleStudentScore.courseSchedule.experimentCourse.courseName}</span>
				<span class="pl-10 pr-10">——</span>
				<span>${scheduleStudentScore.courseSchedule.experiment.experimentName }</span>
			</p>
			<div class="tablePart mt-20">
				<table border="1"  class="stuInfoTable">
					<tr>
						<td>学院</td>
						<td>${scheduleStudentScore.submitter.departmentName }</td>
						<td>班级</td>
						<td>${scheduleStudentScore.submitter.className }</td>
					</tr>
					<tr>
						<td>学号</td>
						<td>${scheduleStudentScore.submitter.username }</td>
						<td>姓名</td>
						<td>${scheduleStudentScore.submitter.name }</td>
					</tr>
					<tr>
						<td>课程</td>
						<td>${scheduleStudentScore.courseSchedule.experimentCourse.courseName  }</td>
						<td>实验名称</td>
						<td>${scheduleStudentScore.courseSchedule.experiment.experimentName }</td>
					</tr>
					<tr>
						<td>指导教师</td>
						<td>${scheduleStudentScore.courseSchedule.experimentCourse.teacherInfoList[0].name  }</td>
						<td>提交时间</td>
						<td>
						<c:choose>
						    <c:when test="${scheduleStudentScore.submitStatus eq 1 || scheduleStudentScore.submitStatus eq 4 }">
						           --
						    </c:when>
						     <c:when test="${scheduleStudentScore.submitStatus eq 2 || scheduleStudentScore.submitStatus eq 3 }">
						          	<fmt:formatDate value="${scheduleStudentScore.submitTime}" pattern="yyyy-MM-dd HH:mm:ss" />	 
						    </c:when>
						</c:choose>
						</td>
					</tr>

				</table>
			</div>
		</div>
		<div class="submit-report mt-20">
			<div class="mt-20 clearfix">
				<p class="secondTitle"><span>学生实验报告</span><i class="Hui-iconfont pl-20">&#xe699;</i></p>
				<div class="testCtrPart clearfix pd-10">
					<c:if test="${not empty  scheduleStudentScore.templateContent}">
					<div class="row cl mb-20">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">数据采集：</label>
						<div class="formControls col-xs-11 col-sm-11">
							<div class="dataGetted">
							<!-- 以下是实验模板内容 -->
							 ${scheduleStudentScore.templateContent}
							<!-- 以上是实验模板内容 -->
							</div>
						</div>
					</div>	
					 </c:if>			
					<c:if test="${empty  scheduleStudentScore.templateContent}"></c:if>
					<div class="row cl mb-20 report-description">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">实验过程：</label>
						<div class="formControls col-xs-11 col-sm-11">
							<div class="report-editor pd-10"><script id="report-editor"  type="text/plain">${scheduleStudentScore.labReport }</script></div>
							<button type="button" value="附上签名" onclick="addSignature()" class="btn btn-primary-outline size-MINI radius mt-5 f-r">附上签名</button>
							<button type="button" value="导出描述" onclick="exportType()()" class="btn btn-primary-outline size-MINI radius mt-5 f-r mr-5">导出报告描述</button>
						</div>
					</div>
					<div class="row cl mb-20">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">实验总结：</label>
						<div class="col-xs-11 col-sm-11">
							<c:if test="${not empty  scheduleStudentScore.reportDescription }"> 
							<div class="pd-10" style="border:1px solid #ddd;">${scheduleStudentScore.reportDescription } 
							</div>
							</c:if>
							<c:if test="${empty scheduleStudentScore.reportDescription }"> 未填写实验总结内容！ </c:if>
						</div>
					</div>
					<div class="row cl mb-20">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">实验现象：</label>
						<div class="formControls col-xs-11 col-sm-11">
							<div class="pd-10 mb-5" style="border:1px solid #ddd;">
								<c:choose>
									<c:when test="${empty scheduleStudentScore.gifFile }">
										<p style="color:#666;background:#eee;padding:10px;text-align:center;margin:0 auto;font-size:16px;">无实验结果动态图!</p>
									</c:when>
									<c:otherwise>
										<img alt="" src="${RESOURCE_WAY}${scheduleStudentScore.gifFile }" class="resultGif">
									</c:otherwise>
								</c:choose>
							</div>
						</div>
					</div>
					 <div class="row cl mb-20">
						<c:if test="${not empty scheduleStudentScore.projectFileHtml}">
							<label class="col-xs-1 col-sm-1 pn-0 text-r">实验附件预览：</label>
							<div class="formControls col-xs-11 col-sm-11">
								<div class="report-preview mb-5">
									<iframe src="${RESOURCE_WAY}/${scheduleStudentScore.projectFileHtml}"></iframe>
								</div>
							</div>
						</c:if>
						<%-- <c:if test="${ empty scheduleStudentScore.projectFileHtml}"> --%>
						<label class="col-xs-1 col-sm-1 pn-0 text-r">实验附件：</label>
						<%-- </c:if> --%>
						<div class="formControls col-xs-11 col-sm-11">
							<div class="text-c bg-1 bk-gray radius pd-20">
								<c:choose>
									<c:when test="${scheduleStudentScore.projectFile eq null}">
										<span class="f-14 btn btn-primary-outline radius" onclick="layerMsg('该学生没有提交工程文件！',3000);">下载实验附件</span>
									</c:when>
									<c:when test="${ not empty scheduleStudentScore.projectFile }">
										<span class="f-14 btn btn-primary radius bk-gray">
											<a href="${RESOURCE_WAY}${scheduleStudentScore.projectFile}" class="c-white" target="_blank">下载实验附件</a>
										</span>
									</c:when>
								</c:choose>
							 	<span style="margin-left: 150px;" class="f-14 c-white btn btn-success radius bk-gray">
									<a href="javascript:void(0)" onclick="exportType()">生成实验报告</a>
									<div class="getReportDoc" style="display: none"></div>
								</span> 
							</div>
							<div></div>
						</div>
					</div> 
				</div>
			</div>
		</div>
		<c:choose>
		<c:when test="${scheduleStudentScore.submitStatus !=  1 && scheduleStudentScore.submitStatus!= 6 }">
		<form action="${ctx}/scheduleStudentScoreController/update" method="post" id="form-studentSubmit-edit">
			<div class="submit-read mt-30">
				<p class="secondTitle"><span>批改实验报告：</span><i class="Hui-iconfont pl-20">&#xe699;</i></p>
				<div class="clearfix pd-10">
					<div class="row cl mb-20">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">报告评分：</label>
						<div class="formControls col-xs-11 col-sm-11">
							<div class="score-text">
								<div class="tablePart" id="experimentstandard-score">
									<c:if test="${ scheduleStudentScore.submitStatus == 4 || scheduleStudentScore.submitStatus == 2}">
									<table border="1" class="experimentStandardTable">
										<tbody>
											<tr>
												<td style="width:45px;">序号</td>
												<td>内容</td>
												<td style="width:60px;">评分标准</td>
												<!-- <td style="width: 40px;">分数</td> -->
											</tr>
											<input name="standardId" value="935" type="hidden">
											<tr>
												<td>1</td>
												<td>实验报告内容完整（10分），步骤正确（10分），对设计过程中的问题分析、处理合理（10分）。</td>
												<td>30.0</td>
												<!-- <td><input name="studentScore" type="text" class="student_score" value=""></td> -->
											</tr>
											<input name="standardId" value="936" type="hidden">
											<tr>
												<td>2</td>
												<td>对所设计的作品强度和稳定性分析正确（20分），作品优缺点分析合理（10分），提出改进意见（10分）。</td>
												<td>40.0</td>
												<!-- <td><input name="studentScore" type="text" class="student_score" value=""></td> -->
											</tr>
											<input name="standardId" value="937" type="hidden">
											<tr>
												<td>3</td>
												<td>对设计制作过程中的问题、结论等进行分析总结，设计中的经验教训、收获等总结。
												</td>
												<td>20.0</td>
												<!-- <td><input name="studentScore" type="text" class="student_score" value=""></td> -->
											</tr>
											<input name="standardId" value="938" type="hidden">
											<tr>
												<td>4</td>
												<td>按要求完成作业，结果正确。</td>
												<td>10.0</td>
												<!-- <td><input name="studentScore" type="text" class="student_score" value=""></td> -->
											</tr>
									</tbody>
									</table>
									<p class="pt-10"><span>学生得分: </span><input name="studentScore" type="text" class="student_score" value="" style="border:none;border-bottom:1px solid #666;"></p>
								</c:if>
								
								<c:if test="${scheduleStudentScore.score!=4 || scheduleStudentScore.score!=2}">
								上次得分: ${scheduleStudentScore.score} 分
								</c:if>
									
								</div>
							</div>
						</div>
					</div>	
					<div class="row cl mb-20">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">是否重做：</label>
						<div class="formControls col-xs-11 col-sm-11">
							<c:choose>
						 		<c:when test="${scheduleStudentScore.submitStatus==3 }">
								<label><input name="submitStatus" type="radio" value="3" <c:if test="${scheduleStudentScore.submitStatus != 4 }">checked="checked"</c:if> disabled="disabled"/><span class="pl-10">否</span></label>
								<label><input name="submitStatus" type="radio" value="4" <c:if test="${scheduleStudentScore.submitStatus == 4 }">checked="checked"</c:if> disabled="disabled"/><span class="pl-10">是</span></label>
								</c:when>
								<c:otherwise>
								<label><input name="submitStatus" type="radio" value="3" <c:if test="${scheduleStudentScore.submitStatus != 4 }">checked="checked"</c:if> /><span class="pl-10">否</span></label>
								<label><input name="submitStatus" type="radio" value="4" <c:if test="${scheduleStudentScore.submitStatus == 4 }">checked="checked"</c:if> /><span class="pl-10">是</span></label>
								</c:otherwise>
							</c:choose>
						</div>
					</div>
	
					<div class="row cl mb-20">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">教师评语：</label>
						<div class="formControls col-xs-11 col-sm-11">
							<div class="tch-text clearfix">
							  <c:choose>
							 	<c:when test="${scheduleStudentScore.submitStatus==7 }">
								<textarea id="remark" name="remark" disabled="disabled" rows="" cols="">${scheduleStudentScore.remark }</textarea>
								<button class="c-white btn btn-default-outline f-r mt-10 radius" type="button" disabled="disabled" onclick="addRemark();">设为常用评语</button>
							 	</c:when>
							 	<c:otherwise>
								<textarea id="remark" name="remark" rows="" cols="">${scheduleStudentScore.remark }</textarea>
								<button class="btn btn-primary c-white f-r mt-10 size-MINI radius" type="button"  onclick="addRemark();">设为常用评语</button>
							 	</c:otherwise>
							 </c:choose>
							</div>
							<div class="tch-textRecord mt-10" style="<c:if test="${scheduleStudentScore.submitStatus==3 }">display:none;</c:if>">
								<p class="remarkTitle" style="margin: 0;"><i class="Hui-iconfont pl-5 pr-5" style="cursor:pointer;color:#1e6269">&#xe6a1;</i>常用评语:</p>
								<ul class="pd-5 pb-10 teacherRemark">
								  <c:forEach items="${remarks }" var="r">
									<li class="pd-5 mt-10">
										<p class="clearfix"><span onclick="selectRemark(this);">${r.remark}</span><i onclick="removeRemark(this,${r.teacherRemarkId});" class="Hui-iconfont" style="color:red">&#xe706;</i></p>
									</li>
								 </c:forEach>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-30">
				<p class="secondTitle "><span>批量批改：</span><i class="Hui-iconfont pl-20">&#xe699;</i></p>
				<div class="pd-10">
				  	<div class="readList" style="<c:if test="${scheduleStudentScore.submitStatus==3 }">display:none;</c:if>">
						<p class="f-12 c-red">提示：您下列所选择的学生实验成绩将于该学生的实验成绩一致</p>
						<div class="pt-10 pb-10">
							<label><input type="checkbox" name="" onchange="selectAll(this);"><span>全选[已批改]</span></label>
							<ul class="pl-20 pr-20 clearfix ul1">
							   <c:forEach items="${ScoreSu }" var="r">
										<li>
											<input type="checkbox" name="ids" value="${r.scheduleStudentScoreId }" onchange="selectedStu(this);">
									        <span  >${r.studentName }</span>
										</li>
								</c:forEach>
							</ul>
						</div>
						<p style="border-bottom:1px solid #ddd;margin:0;"></p>
						<div class="pt-10 pb-10">
							<label><input type="checkbox" name="" onchange="selectAll(this);"><span>全选[未批改]</span></label>
							<ul class="pl-20 pr-20 clearfix ul2">
							  <c:forEach items="${ScoreWait }" var="r">
								<li>
									<input type="checkbox" name="ids" value="${r.scheduleStudentScoreId }" onchange="selectedStu(this);">
									<span >${r.studentName }</span>
								</li>
							  </c:forEach>
							</ul>
						</div>
					</div>
					<div class="text-c pt-30 pd-30" style="border-top:1px solid #ddd;">
						<input type="hidden" name="scheduleStudentScoreId" value="${scheduleStudentScore.scheduleStudentScoreId}"/>
						<input type="hidden" name="labReport" id="labReport" value="">
						<c:choose>
						 	<c:when test="${scheduleStudentScore.submitStatus==3 }"><!--已批改  -->
	 							 <input type="button" id="studentSubmit-edit-sub" value="确认重批" style="display:none;"/>
	 							 <input type="button" value="取消编辑" class="reset ml-20 btn radius" onclick="cancalFormEdit();"/>
						 	</c:when>
						 	<c:otherwise>
	 							 <input type="button" id="studentSubmit-edit-sub" value="确认批改" class="btn radius"/><!--待批改  -->
						 	</c:otherwise>
						 </c:choose>
					</div>
					
				</div>
				<c:if test="${scheduleStudentScore.submitStatus==3 }">
				<p class="editForm" style="position:absolute;top:-10px;right:20px;" onclick="reInitForm();"><a class="f-12" href="javascript:void(0);"><i class="iconfont icon-bianji"></i>编辑</></p>
				</c:if>
			</div>
		</form>
		</c:when>
		<c:otherwise></c:otherwise>
		</c:choose>
	</div>
	<input value="1" type="hidden">
<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
	
<script type="text/javascript">
	var realPath='${ctx}';
</script>
	
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/ckplayer/ckplayer.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/staticfile/lib/flexpaper/flexpaper_flash.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/lib/flexpaper/flexpaper_flash_debug.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/jsPDF/html2canvas_back.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/jsPDF/dist/jspdf.debug.js"></script>

<script type="text/javascript">
var realPath='${ctx}';
var RESOURCE_WAY='${RESOURCE_WAY}';
var ueditFilePath = '${scheduleStudentScore.courseSchedule.experiment.experimentInstructorBag}';
</script>


<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.config.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx }/staticfile/utf8-jsp/lang/zh-cn/zh-cn.js"></script>

<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->

<script type="text/javascript">
var ue = null;
 	$(function(){
	  var l=$('.ul1').children('li').length/1;
	  if(l<=0){
		  $('.ul1').append("<p>暂无批改过的学生</p>");
	  }
	  var len=$('.ul2').children('li').length/1;
	  if(len<=0){
		  $('.ul2').append("<p>暂无提交的学生</p>");
	  }
	}) 
	
 var value = '${scheduleStudentScore.remark }';
value = value.replace(new RegExp("<br/>",'gm'),"\n")
			 .replace(new RegExp("<br/>",'gm'),"\n")
			 .replace(new RegExp("&nbsp;",'gm')," ");
$("#remark").val(value); 

$('#studentSubmit-edit-sub').on('click',function(){
	layer.confirm('是否确认批改？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  $('#form-studentSubmit-edit').submit();
	});
})

	$("#form-studentSubmit-edit").Validform({
		btnReset:"#studentSubmit-edit-reset",
		tiptype:2, 
		ignoreHidden:false,
		dragonfly:false,
		tipSweep:false,
		label:".label",
		showAllError:true,
		postonce:true,
		ajaxPost:true,
		datatype:{
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"n-en" : /[0-9a-zA-Z]{1,23}/,
			"ch"   : /[\u4E00-\u9FA5]+$/,
			"select": function(){
				
			}
		},
		usePlugin:{
			swfupload:{},
			datepicker:{},
			passwordstrength:{},
			jqtransform:{
				selector:"select,input"
			}
		},
		beforeCheck:function(curform){
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
			var value = $("#remark").val();
			value = value.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
			$("#remark").val(value);
			$("#labReport").val(ue.getContent());
		},
		callback:function(data){
			console.log(data);
			if(data.status=="200"){
				layer.msg('操作成功',{icon:1,time:1500});
				var index = parent.layer.getChildFrame(window.name);
				setTimeout(function(){location.replace(location.href)},1500);
			}else{
				$("#Validform_msg").css('display','none');
				layer.msg(data.msg,{icon:2,time:1500});
			}
		}
	});
</script>
<!--初始化实验报告   个性签名-->
<script type="text/javascript">
ue = UE.getEditor('report-editor',{
	toolbars: [[
    'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
    ]],
    autoHeightEnabled: false,initialFrameHeight:350
});

/* 附上个性签名*/
function addSignature(){
	var signature = '<img src="${RESOURCE_WAY}/${teacherInfo.exp1}"/>';
	//content += $('.stuInfo').html();
	console.log(signature);
	var content = ue.getContent() + signature;
	ue.setContent(content);
}
	
</script>
<!--生成实验报告-->
<script type="text/javascript">
	//选择导出类型
	function exportType(){
		layer.confirm('<span style="font-size:20px;">生成实验报告的格式是?</span>', {
			 area:['498px','auto'],
			  title:'生成实验报告的格式',
			  btn: ['导出World','导出PDF'] //按钮
			},function(){//导出world
				report2Word('${scheduleStudentScore.courseSchedule.experiment.experimentName}');
			},function(){//导出PDF
				report2PDF('${scheduleStudentScore.courseSchedule.experiment.experimentName}');
			}
		);
	}
	
	
	function report2Word(experimentName){
		var goodReport = "";
		var scoreHtml = "";
		var remarkHtml = "";
		var isGoodReport = $('input[name="goodReport"]:checked').val();
		/* if(isGoodReport==0){
			goodReport = '<p class="secondTitle" style="text-align:left;"><span>是否优秀:否</span></p>';
		}else{
			goodReport = '<p class="secondTitle" style="text-align:left;"><span>是否优秀:是</span></p>';
		} */
		scoreHtml = '<p class="secondTitle" style="text-align:left;" ><studentSubmit-edit-subspan>评分：'+$('#experimentstandard-score').html()+'</span></p>';
		
		
		var remark = $('#remark').val();
		remarkHtml='<p class="secondTitle " style="text-align:left;"><span>评语：'+remark+'</span></p>';
		var invitationContent = $('.tablePart').html()+ue.getContent()+goodReport+scoreHtml+remarkHtml;
		$(".getReportDoc").html(invitationContent);
		invitationContent = $('.getReportDoc').html();
		var form = $("<form>");   //定义一个form表单
		form.attr('style', 'display:none');   //在form表单中添加查询参数
		form.attr('target', '');
		form.attr('method', 'post');
		form.attr('action', '${ctx}/scheduleStudentScoreController/report2World');
		/*实验报告  */
		invitationContent = '<div id="container">'+invitationContent+'</div>'
		var input1 = $('<input>');
		input1.attr('type', 'hidden');
		input1.attr('name', 'report');
		input1.attr('value', invitationContent);
		
		/*文件名称*/
		var fileName = "${scheduleStudentScore.submitter.majorName}${scheduleStudentScore.submitter.className}-${scheduleStudentScore.submitter.username}${scheduleStudentScore.submitter.name}"+"《"+experimentName+"》";
		console.log(fileName);
		var input2 = $('<input>');
		input2.attr('type', 'hidden');
		input2.attr('name', 'fileName');
		input2.attr('value', fileName);
		
		//实验报告ID
		var input3 = $('<input>');
		input3.attr('type', 'hidden');
		input3.attr('name', 'submitId');
		input3.attr('value', '${scheduleStudentScore.scheduleStudentScoreId}');
		
		$('body').append(form);  //将表单放置在web中
		form.append(input1);   //将查询参数控件提交到表单上
		form.append(input2);
		form.append(input3);
		form.submit();
	}
	
	function report2PDF(experimentName){
		
		toPdfPrefix();
		var index = layer.open({
			type : 2,
			scrollbar : false,
			title : 'PDF预览',
			content : '${ctx}/scheduleStudentScoreController/report2PDF/${scheduleStudentScore.scheduleStudentScoreId}',
			area : [ '600px', '450px' ],
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	
	
	//执行toPdf前运行一遍 
	function toPdfPrefix(){
		  html2canvas(document.body, {
			  useCORS:true,
		  	  onrendered:function(canvas) {
		  	      var contentWidth = canvas.width;
		  	      var contentHeight = canvas.height;
		  	      //一页pdf显示html页面生成的canvas高度;
		  	      var pageHeight = contentWidth / 592.28 * 841.89;
		  	      //未生成pdf的html页面高度
		  	      var leftHeight = contentHeight;
		  	      //页面偏移
		  	      var position = 0;
		  	      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
		  	      var imgWidth = 595.28;
		  	      var imgHeight = 592.28/contentWidth * contentHeight;

		  	      var pageData = canvas.toDataURL('image/jpeg', 1.0);
		  	  }})
	}
	
	function reInitForm(){
		$('.editForm').hide();
		//$('.tablePart').children('.student_score').removeAttr('disabled');
		//$('.score-text').children('input').removeAttr('disabled');
		$('.student_score').each(function(){
			$(this).removeAttr('disabled');
		});
		$('input[name="goodReport"]').removeAttr('disabled');
		$('input[name="submitStatus"]').removeAttr('disabled');
		$('.tch-text').children('textarea').removeAttr('disabled');
		$('.tch-text').children('button').removeAttr('disabled').css('background','#1e6269');
		$('#studentSubmit-edit-sub').show();
		$('.reset').show();
		$('.tch-textRecord').show();
		$('.readList').show();
	}
	
	function layerMsg(msg,t){
		layer.msg(msg,{time:t});
	}
	
	function cancalFormEdit(){
		location.replace(location.href);
	}
	
	//添加评语
	function addRemark(){
		var value = $("#remark").val();
		value = value.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
		$("#remark").val(value);
		layer.confirm('确认要保存该评语？',{title:'保存评语'},function(index){
		$.ajax({
			type:'POST',
			url:'${ctx}/teacherRemarkController/addTeacherRemark',
			data: {
				remark:value
			},
			success: function(sysresult){
				if(sysresult.status==200){
					
					$('.tch-textRecord ul').children('li').removeClass('checked');
					var text = '<li class="pd-5 mt-10 checked"><p class="clearfix"><span onclick="selectRemark(this);">'+value+'</span><i onclick="removeRemark(this,'+sysresult.data.teacherRemarkId+');" class="Hui-iconfont" style="color:red">&#xe706;</i></p></li>';
					$('.tch-textRecord').children('ul').append(text);
					layer.msg('保存成功！',{icon:1,time:2000});
				}else{
					layer.msg(sysresult.msg,{icon:2,time:2000});
				}
			},
			error: function(sysresult){
				
			}
		})
		})
	}
	
	//删除评语
	function removeRemark(obj,id){
		
		layer.confirm('确认要删除该评语？',{title:'删除资源评语'},function(index){
			$.ajax({
				type:'POST',
				url:'${ctx}/teacherRemarkController/deleteTeacherRemark',
				data:{
					id : id
				},
				success: function(sysresult){
					if(sysresult.status==200){
						$(obj).parents('li').remove();
						layer.msg('删除成功！',{icon:1,time:2000});
					}else{
						layer.msg(sysresult.msg,{icon:2,time:2000});
					}
				},
				error:function(sysresult){
					
				}
			})
		})
	}
	
	//选中评语
	function selectRemark(obj){
		var text = $(obj).html();
		$("#remark").focus().val(text);
		$(obj).parents('li').addClass('checked');
		$(obj).parents('li').siblings('li').removeClass('checked');
	}
		
	//全选学生
	function selectAll(obj){
		var $obj = $(obj);
		 if($obj.prop('checked')){
			 $obj.parent().siblings('ul').find('input[name=ids]').prop('checked',true);
		 }else{
			 $obj.parent().siblings('ul').find('input[name=ids]').prop('checked',false);
		 }
	}
	
	//选中事件
	function selectedStu(obj){
		var obj = $(obj);
		var a = true;
		 obj.parent().parent().find('input[name=ids]').each(function(index,ele){
			 if(obj.parent().parent().find('input[name=ids]').eq(index).prop('checked')==false){
				 a = false;
			 }
		 });
		 obj.parent().parent().siblings('label').find('input[type=checkbox]').prop('checked',a);
	}
	
		
	$(function(){
		$("#Validform_msg").addClass("hide_Validform");
		$('.secondTitle i').toggle(function(){
			$(this).html('&#xe698;');
			$(this).parent().siblings('div').slideUp();
		},function(){
			$(this).html('&#xe699;');
			$(this).parent().siblings('div').slideDown();
		});
		
		$('.remarkTitle i').toggle(function(){
			$(this).html('&#xe600;');
			$(this).parent().siblings('ul').slideUp();
		},function(){
			$(this).html('&#xe6a1;');
			$(this).parent().siblings('ul').slideDown();
		});
	})
</script>
</body>
</html>