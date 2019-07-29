<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
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
<div class="page-container cl" style="width:560px;margin: 0 auto;">
    <div class="f-l mr-20" style="width:259px;">
    	<p class="cl">
			<span class="c-333">所属院系: </span>
			<span class="pl-10 c-666">${experimentGroup.tbClass.grade.major.department.name }</span>
		</p>
		<p class="cl">
			<span class="c-333">所属课程: </span>
			<span class="pl-10 c-666">${experimentGroup.experimentCourse.courseName }</span>
		</p>
		<p class="cl">
			<span class="c-333">所属班级: </span>
			<span class="pl-10 c-666">${experimentGroup.tbClass.name }</span>
		</p>
    </div>
    <div style="width:2px;background:#ddd;height:90px;" class="f-l"></div>
	<div class="f-l ml-20" style="width:259px;">
		<p class="cl">
			<span class="c-333">实验名称: </span>
			<span class="pl-10 c-666">${experimentGroup.experiment.experimentName }</span>
		</p>
		<p class="cl">
			<span class="c-333">指导老师: </span>
			<span class="pl-10 c-666">${experimentGroup.teacherInfo.name}</span>
		</p>
		<p class="cl">
			<span class="c-333">实验状态: </span>
			<span class="pl-10 c-666">
			<c:choose>
				<c:when test="${experimentGroup.experimentStatus eq 1 }">即将开始</c:when>
				<c:when test="${experimentGroup.experimentStatus eq 2 }">进行中</c:when>
				<c:otherwise>已过期</c:otherwise>
			</c:choose>
			</span>
		</p>
	</div>
	<div class="pt-10" style="clear:both;">
		<p class="cl" style="margin:0;font-weight:bold;color:#1e6269;position:relative;">
			<span>小组名称: </span>
			<span class="pl-10">${experimentGroup.groupName }</span>
			<c:choose>
				<c:when test="${menuParam eq 1 }">
					<shiro:hasPermission name="修改实验小组(所有)">
						<span onclick="openEditPage();" class="f-12 pl-5 c-white pr-5" style="font-weight:normal;cursor:pointer;position:absolute;right:0;top:0;background:#1e6269;">
							<a href="javascript:void(0);"><i class="iconfont icon-bianji" style="cursor:pointer; font-size:12px;">编辑小组</i></a>
						</span>					
					</shiro:hasPermission>
				</c:when>
				<c:when test="${menuParam eq 2}">
					<shiro:hasPermission name="修改实验小组(院系)">
						<span onclick="openEditPage();" class="f-12 pl-5 c-white pr-5" style="font-weight:normal;cursor:pointer;position:absolute;right:0;top:0;background:#1e6269;">
							<a href="javascript:void(0);"><i class="iconfont icon-bianji" style="cursor:pointer; font-size:12px;">编辑小组</i></a>
						</span>					
					</shiro:hasPermission>
				</c:when>
				<c:otherwise>
					<shiro:hasPermission name="修改实验小组(个人)">
						<span onclick="openEditPage();" class="f-12 pl-5 c-white pr-5" style="font-weight:normal;cursor:pointer;position:absolute;right:0;top:0;background:#1e6269;">
							<a href="javascript:void(0);"><i class="iconfont icon-bianji" style="cursor:pointer; font-size:12px;">编辑小组</i></a>
						</span>					
					</shiro:hasPermission>
				</c:otherwise>
			</c:choose>
			
		</p>
		<p class="cl f-12">
			<span class="c-999">实验时间   </span>
			<span class="pl-10" style="color:#1e6269;">[&nbsp;${experimentGroup.startTimeToString }&nbsp;--&nbsp;${experimentGroup.endTimeToString }&nbsp;]</span>
		</p>
		<div>
			<p class="c-333">小组成员: </p>
			<div class="pd-10" style="margin:0 10px;border:1px dashed #628e8e;background:#f0f0f0;">
				<ul class="cl">
					<c:forEach items="${experimentGroup.studentInfoList }" var="member">
					<li class="f-l pr-10"><label><span class="f-12">${member.name }</span></label></li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
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
	course_edit('编辑小组信息','${ctx}/experimentGroupController/selectGroupAndStudentToEditPage/${experimentGroup.experimentGroupId}');
}

//课程修改
function course_edit(title, url) {
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url,
		area : [ '600px', '400px' ]
	});
	//layer.full(index);
}
</script>

</body>
</html>