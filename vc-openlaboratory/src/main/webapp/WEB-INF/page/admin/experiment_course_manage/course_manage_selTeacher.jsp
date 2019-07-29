<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />

<style type="text/css">
	.cl:after,.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.cl,.clearfix{zoom:1}
	.teacheCheckArraign{padding:20px;}
	.check_teacher_department{padding-bottom:20px;}
	.check_teacher_department p{height:21px;line-height:20px;font-size:16px;padding:8px; cursor:pointer;margin:0;background:#60b4ba;color:#fff;}
	.check_teacher_department p span{display:block;float:left;}
	.check_teacher_department p .drop{float:right;}
	.check_teacher_department p .drop img{height:20px;padding:0 5px;}
	.check_teacher_department ul{border-bottom:1px solid #d8d8d8;padding:10px;display:block;}
	.check_teacherName{display:block;float:left;padding:0 10px;width:75px;}
	.hide_Validform{
		display: none !important;
	}
</style>

</head>
<body>
	<div class="page-container clearfix">
		<form action="${ctx }/experimentCourseTeacherController/distributeTeacherToExperimentCourse/${experimentCourse.experimentCourseId}" method="post" id="form-teacherManage-edit" class="form">
		<input type="hidden" name="courseId" value="${courseId }">
			<ul class="teacheCheckArraign">
				<c:forEach items="${departmentList }" var="department">
					<li class="check_teacher_department">
						<p class="clearfix"><span>${department.name }</span><span class="drop"><img alt="" src="${ctx }/staticfile/images/up1.png"></span></p>
						<ul class="clearfix">
							<c:forEach items="${department.teacherInfoList }" var="teacherInfo">
								<li class="check_teacherName">
									<label><input type="checkbox" name="teacherInfoIds"  <c:if test="${teacherInfo.isSelected ==1 }">checked="checked"</c:if> value="${teacherInfo.id }">${teacherInfo.name }</label>
								</li>
							</c:forEach>
						</ul>
					</li>
				</c:forEach>
			</ul>
			<div class="text-c btnGroup">
				<button onClick="" class="btn btn-primary radius" type="" id="teacherManage-edit-sub">
				<i class="Hui-iconfont">&#xe600;</i>
				 分配</button>
				<button onClick="" class="btn btn-secondary radius" type="button" id="teacherInfoManage-edit-reset" >
				<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
				<i class="iconfont icon-zhongzhi2"></i>
				取消</button>
			</div>
		</form>
	</div>
</body>
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

$(".check_teacher_department p").toggle(function(){
	$(this).parent().children('ul').slideUp();
	$(this).children('.drop').html('<img src="${ctx}/staticfile/images/drop1.png">');
},function(){
	$(this).parent().children('ul').slideDown();
	$(this).children('.drop').html('<img src="${ctx}/staticfile/images/up1.png">');
})

$("#teacherInfoManage-edit-reset").click(function(){
	 var index = parent.layer.getFrameIndex(window.name);
	 parent.layer.close(index);
})
$(function(){
	$(".selectStuNum").hide();
	
	$("#form-teacherManage-edit").Validform({
		btnSubmit:"#teacherManage-edit-sub", 
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
			"ch"   : /[\u4E00-\u9FA5]+$/
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
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
		},
		callback:function(data){
			if(data.status=="200"){
				layer.msg('操作成功',{icon:1,time:1500});
				setTimeout('window.parent.location.reload()',1800);
			}else{
				layer.msg('操作失败，原因:'+data.msg,{icon:2,time:2000});
				setTimeout('window.parent.location.reload()',1800);
			}
		}
	});
})
$(function(){
	$("#Validform_msg").addClass("hide_Validform");
})
</script>
</html>