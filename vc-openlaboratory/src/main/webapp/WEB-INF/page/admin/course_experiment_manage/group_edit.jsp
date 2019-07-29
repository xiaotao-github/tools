<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
<style type="text/css">
	.hide_Validform{
			display: none !important;
		}
</style>
</head>
<body>
<div class="page-container clearfix">
	<form action="${ctx}/experimentGroupController/updateGroup" method="post" id="form-groupManage-edit" class="form">
	<input type="hidden" class="id" name="experimentCourseId" value="${experimentGroup.experimentCourse.experimentCourseId }">
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">所属课程：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<input class="input-text" value="${experimentGroup.experimentCourse.courseName }" disabled="disabled"/>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">所属班级：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<input class="input-text" value="${experimentGroup.tbClass.name }" disabled="disabled"/>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">实验名称：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<input type="hidden" class="id" name="experimentId" value="${experimentGroup.experiment.experimentId }">
				<input class="input-text" value="${experimentGroup.experiment.experimentName }" disabled="disabled"/>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">小组名称：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<input  type="text" name="groupName"  class="input-text" value="${experimentGroup.groupName }" datatype="*" nullmsg="请填写小组名!"/>
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">开始时间：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<input class='notice-time input-text Wdate'  type='text' id='startTime' name="startTime" value="<fmt:formatDate value="${experimentGroup.startTime }" pattern="yyyy-MM-dd HH:mm:ss"/>" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'noticeEndTime\')}'})">  
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">结束时间：</label>
			<div class="formControls col-xs-8 col-sm-8">
			    <input type="text" class="notice-time input-text Wdate" id='noticeEndTime' name="endTime" value="<fmt:formatDate value="${experimentGroup.endTime }" pattern="yyyy-MM-dd HH:mm:ss"/>" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'startTime\')}'})"/>   
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">小组成员：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<ul class="cl">
				 <c:forEach items="${experimentGroup.studentInfoList }" var="stu">
					<li class="f-l pr-10"><label><input name="studentInfoIds" value="${stu.id }" type="checkbox" checked="checked"/>${stu.name }
					
					<c:choose>
						<c:when test="${fn:length(stu.username)<=4 }">
									(${stu.username })
						</c:when>
						<c:otherwise>
			 				 	(${fn:substring(stu.username,fn:length(stu.username)-4,fn:length(stu.username)) })
						</c:otherwise>
					 </c:choose>
					 
					</label></li>
				</c:forEach> 
				</ul>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">未分配的小组成员：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<ul class="cl">
				<c:forEach items="${experimentGroup.notGroupStudentInfoList }" var="stu">
					<li class="f-l pr-10"><label><input name="studentInfoIds" value="${stu.id }" type="checkbox"/>${stu.name }
					
					<c:choose>
						<c:when test="${fn:length(stu.username)<=4 }">
									(${stu.username })
						</c:when>
						<c:otherwise>
			 				 	(${fn:substring(stu.username,fn:length(stu.username)-4,fn:length(stu.username)) })
						</c:otherwise>
					 </c:choose>
					 
					</label></li>
				</c:forEach>
				</ul> 	
			</div>
		</div>
        <input type="hidden" name="experimentGroupId" value="${experimentGroup.experimentGroupId}"/>
		<div class="row cl">
			<div class="col-xs-12 col-sm-12 text-c">
				<button onClick="" class="btn btn-primary radius" type="button" id="groupManage-edit-sub">
				<i class="Hui-iconfont">&#xe600;</i>
				 修改</button>
				<button onClick="" class="btn btn-secondary radius" type="button" id="groupManage-edit-reset">
				<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
				<i class="iconfont icon-zhongzhi2"></i>
				取消</button>
			</div>
		</div>
	</form>
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
<script type="text/javascript">

$(function(){
	$("#groupManage-edit-reset").click(function(){
		 var index = parent.layer.getFrameIndex(window.name);
		 parent.layer.close(index);
	})
	
	$("#form-groupManage-edit").Validform({
		btnSubmit:"#groupManage-edit-sub", 
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
			"number":/^[0-9]{1,3}$/
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
		callback:function(data){
			if(data.status==200){
				layer.msg('修改成功!',{icon:1,time:1500});
				setTimeout('window.parent.location.reload()',1800);
			}else if(data.status==202){
				$("#Validform_msg").css({'display':'none'});
				layer.msg(data.msg,{icon:2,time:1500});
				setTimeout('window.location',1800);
			}
		}
	});
})
	$(function(){
		$("#Validform_msg").addClass("hide_Validform");
	})
</script>

</body>
</html>