<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--_meta 作为公共模版分离出去-->
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>

<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
</head>
<body>
<div class="page-container cl" style="width:550px;margin: 0 auto;">
	<p class="cl"><span class="c-333 f-22">${experimentCourse.courseName }</span><span class="c-666 f-12 pl-10">[&nbsp;课程编号: ${experimentCourse.number }&nbsp;]</span></p>
    <div class="f-l" style="width:230px;margin-top:40px;">
        <div class="text-c" style="width:100%;height:200px;float:left;padding:0;">
       <c:choose>
		<c:when test="${empty experimentCourse.resourceFile.fileFormatPath}">
			<img src="${cookie.RESOURCE_WAY.value}/system_file/img/experiment_course_default.jpg"  class="avatar radius size-L" />
		</c:when>
		<c:otherwise>
        	<img id="ImgPr" src="${cookie.RESOURCE_WAY.value}/${experimentCourse.resourceFile.fileFormatPath}" style="height:100%;max-width:230px;">
        </c:otherwise>
       </c:choose>
        </div>
    </div>
	<div class="f-l ml-20" style="width:300px;">
		<p class="cl">
			<span class="c-333">所属院系: </span>
			<span class="pl-10 c-666">${experimentCourse.department.name}</span>
		</p>
		<p class="cl">
			<span class="c-333">课程学期: </span>
			<span class="pl-10 c-666">
			<%--   <c:choose>
	             <c:when test="${experimentCourse.semester eq '1' }">上学期</c:when>
	             <c:when test="${experimentCourse.semester eq '2' }">下学期</c:when>
                  <c:otherwise>上下学期</c:otherwise>
	        </c:choose> --%>
	        <span class="pl-10 c-666">${experimentCourse.semester}</span>
		 </span>
		</p>
		<p class="cl">
			<span class="c-333">课程学时: </span>
			<span class="pl-10 c-666">${experimentCourse.classHour }</span>
		</p>
		<p class="cl">
			<span class="f-l c-333">课程介绍: </span>
			<span class="c-666" style="padding-left:70px;display:block;">${experimentCourse.presentation }</span>
		</p>
		<p class="cl">
			<span class="c-333">任课教师: </span>
			<span class="pl-10 c-666">
			<c:if test="${empty experimentCourse.teacherInfoList}">暂无安排教师</c:if>
			<c:if test="${not empty experimentCourse.teacherInfoList }">
			
			<c:forEach items="${experimentCourse.teacherInfoList }" var="t">
					${t.name } &nbsp;
			</c:forEach>
			</c:if>
				
			</span>
		</p>
		<p class="cl">
			<span class="c-333">授课班级: </span>
			<span class="pl-10 c-666 tbClass">
			<c:if test="${not empty experimentCourse.tbclass  }">
			<c:forEach items="${experimentCourse.tbclass }" var="tb">
					${tb.name } &nbsp;
				</c:forEach>
			</c:if>
			<c:if test="${empty experimentCourse.tbclass }">暂无安排班级</c:if>
			
			</span>
		</p>
	</div>
	<%-- <div class="col-xs-12 col-sm-12 text-r mt-20">
		<span onclick="openEditPage();" style="cursor:pointer"><i class="iconfont icon-bianji"></i>编辑课程</span>
		<span class="pl-20">操作员: ${experimentCourse.teacherInfo.name }</span>
	</div> --%>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<!--图片上传预览-->

<script type="text/javascript">
var departmentId="${course.department.id}"
var menuParam="${menuParam}"
if(menuParam==3){
	menuParam=2;
}

//请求所有院系
function openEditPage(){
	course_edit('编辑实验课程《${experimentCourse.courseName}》','${ctx}/experimentCourseController/selectExperimentCourseByIdToEditPage/${experimentCourse.experimentCourseId }/${menuParam}');
}

//课程修改
function course_edit(title, url) {
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url,
		area : [ '600px', '400px' ],
		maxmin:true,
		scrollbar: false,
		resize: true
	});
	//layer.full(index);
}
/*根据实验课程ID查询课程下的班级*/
/* var experimentCourseId='${experimentCourse.experimentCourseId}';
$(function(){
	$.ajax({
		async: true,
		type: 'GET',
		url: '${ctx}/experimentCourseClassController/selectClassByExperimentCourseId/'+experimentCourseId,
		dataType: 'json',
		success: function(sysresult){
	 		if(sysresult.status == 200){
	 			var content ='';
				for(var i=0;i<sysresult.data.length;i++){
					
					content+=(sysresult.data[i]).name+'('+sysresult.data[i].majorName+')&nbsp; ';
					
				}
				$(".tbClass").append(content);
			} 
		},
		error:function(data) {
		}
	})
}) 
//接口被修改，跳转进入即获取数据
*/
</script>

</body>
</html>