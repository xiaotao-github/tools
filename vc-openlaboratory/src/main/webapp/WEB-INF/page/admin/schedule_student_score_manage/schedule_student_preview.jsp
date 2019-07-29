<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>
<![endif]-->
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/submit_experiment_preview.css">
<style>
	.stuInfoTable{}
	.tablePart .stuInfoTable{width:100%;border: 1px solid #ddd;border-right: none;border-bottom: none;border-collapse: collapse;}
	.tablePart .stuInfoTable tr{height: 35px;padding: 0;border: none;text-align:center;}
	.tablePart .stuInfoTable tr td{border: 1px solid #ddd;border-left: none;border-top: none;font-size: 14px;}
	.hide_Validform{
		display: none !important;
	}
</style>
<title>生成实验批改结果报告</title>
</head>
<body>
	<div class="container">
		<div class="submit-title">
			<p class="titlePart f-20">
				<span>${scheduleStudentScore.courseSchedule.experimentCourse.courseName}</span>
				<span class="pl-10 pr-10">——</span>
				<span>${scheduleStudentScore.courseSchedule.experiment.experimentName }</span>
			</p>
			<div class="tablePart">
				<table border="1"  class="stuInfoTable">
					<tr>
						<td>学院</td>
						<td>${scheduleStudentScore.submitter.departmentName }</td>
						<td>班级</td>
						<td>${scheduleStudentScore.submitter.className }</td>
					</tr>
					<tr>
						<td>姓名</td>
						<td>${scheduleStudentScore.submitter.name }</td>
						<td>学号</td>
						<td>${scheduleStudentScore.submitter.username }</td>
					</tr>
					<tr>
						<td>课程</td>
						<td>${scheduleStudentScore.courseSchedule.experimentCourse.courseName  }</td>
						<td>实验名称</td>
						<td>${scheduleStudentScore.courseSchedule.experiment.experimentName }</td>
					</tr>
					<tr>
						<td>指导教师</td>
						<td>${scheduleStudentScore.courseSchedule.teacherInfo.name  }</td>
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
			<p class="firstTitle">实验报告</p>
			<div class="">
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
					
				<div class="mt-20">
					<p class="secondTitle"><span><!-- 学生实验报告 -->实验过程</span><i class="Hui-iconfont pl-20">&#xe699;</i></p>
					<div class="testCtrPart"> ${scheduleStudentScore.labReport }</div>
				</div>
				<div class="mt-20">
					<p class="secondTitle"><span>实验结果动态图</span><i class="Hui-iconfont pl-20">&#xe699;</i></p>
					<div class="pd-10" style="border:1px solid #ddd;margin:10px;">
						<c:choose>
							<c:when test="${empty scheduleStudentScore.gifFile }">
								<p style="color:#666;background:#eee;padding:10px;text-align:center;margin:0 auto;font-size:16px;">无实验结果动态图!</p>
							</c:when>
							<c:otherwise>
								<img alt="" src="${RESOURCE_WAY}/${scheduleStudentScore.gifFile }" class="resultGif">
							</c:otherwise>
						</c:choose>
					</div>
				</div>
					<div class="row cl mb-20">
						<label class="col-xs-1 col-sm-1 pn-0 text-r">实验总结：</label>
						<div class="col-xs-11 col-sm-11">
							<div class="pd-10" style="border:1px solid #ddd;">${scheduleStudentScore.reportDescription }</div>
						</div>
					</div>
			</div>
		</div>
		<div class="submit-read mt-20">
			<p class="firstTitle">批阅</p>
				<div class="" style="position:relative;">
					<div class="mt-20 socre">
						<p class="secondTitle"><span>评分：</span></p>
						<div class="pl-20 pr-20 score-text">
						 <div class="tablePart">
							 <table border="1"  class="experimentStandardTable">
									<tr>
										<td style="width:45px;">序号</td>
										<td>内容</td>
										<td style="width:60px;">评分标准</td>
									</tr>
										<input name="standardId" value="935" type="hidden"/>
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
											<tr>
									<c:forEach items="${scheduleStudentScore.experimentStandards}" var="experimentStandard" varStatus="sv">									
											<td><c:choose>
											<c:when test="${submitExperimentFile.submitStatus==3 }">
											<input name="studentScore"  type="text" class="student_score" disabled="disabled" value="${experimentStandard.studentScore }"/>
											</c:when>
											<c:otherwise>
											<input name="studentScore" type="text" class="student_score" value="${experimentStandard.studentScore }"/>
											</c:otherwise></c:choose>
											</td>
										</tr>
									</c:forEach>
							</table>
						 </div>
						</div>
					</div>
					<%-- <div class="mt-20">
						<p class="secondTitle"><span>是否优秀: <c:choose> <c:when test="${scheduleStudentScore.goodReport eq 1 }">是</c:when> <c:otherwise> 否</c:otherwise> </c:choose></span></p>
					</div> --%>
					<div class="mt-20">
						<p class="secondTitle"><span>
						<c:if test="${scheduleStudentScore.score!=0}">
								评分：${scheduleStudentScore.score} 分
						</c:if>
								
						<c:if test="${scheduleStudentScore.score==0}">
								未批改!
						</c:if>
								
								</span>
						</p>
					</div> 
					<div class="mt-20 remark">
						<p class="secondTitle "><span>评语：</span></p>
						<div class="pl-20 pr-20">
							<div class="tch-text clearfix">
								<textarea id="remark" name="remark" disabled="disabled" rows="" cols="">${scheduleStudentScore.remark }</textarea>
							</div>
						</div>
					</div>
				</div>
		</div>
	</div>	
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
$(function(){
	 $("img").each(function(index){
		 $(this).attr("crossorigin","anonymous");
	});
	setTimeout("toPDF();",1500);
})

/*转pdf*/
function toPDF(){
	  html2canvas(document.body, {
		  useCORS:true,
	  	  onrendered:function(canvas) {
	  		var fileName = "${scheduleStudentScore.submitter.majorName}${scheduleStudentScore.submitter.className}-${scheduleStudentScore.submitter.username}${submitExperimentFile.submitter.name}"+"《${scheduleStudentScore.courseSchedule.experiment.experimentName}》";
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

	  	      var pdf = new jsPDF('', 'pt', 'a4');

	  	      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
	  	      //当内容未超过pdf一页显示的范围，无需分页
	  	      if (leftHeight < pageHeight) {
	  	      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
	  	      } else {
	  	          while(leftHeight > 0) {
	  	              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
	  	              leftHeight -= pageHeight;
	  	              position -= 841.89;
	  	              //避免添加空白页
	  	              if(leftHeight > 0) {
	  	                pdf.addPage();
	  	              }
	  	          }
	  	      }
	  	      pdf.save(fileName+'.pdf');
	  	  }})
}

</script>
</body>
</html>