<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css" />

	<style>
		.cl:after,.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.cl,.clearfix{zoom:1}
		.head{padding:10px;}
		.head .p1{font-size:16px;color:#60b4ba;font-weight:bold;}
		.head .p1 .span1{font-size:18px;padding:0 10px;}
		.head .p1 .span2{font-size:12px;font-weight:normal;color:#8c8c8c;}
		.coursesArraign{display:block;margin:0 auto;}
		.theFirstStage{padding:10px;}
		.theFirstTitle{height:21px;background:#60b4ba;line-height:21px;cursor:pointer; color:#fff;padding:8px;}
		.theFirstTitle span{display:block;float:left;font-size:16px;}
		.theFirstTitle .drop{float:right;}
		.theFirstTitle .drop img{height:21px;}
		.theSecondStage{display:none;}
		.theSecondTitle{cursor:pointer;cursor: pointer;height: 21px; padding: 8px;line-height: 20px;background-color: #f0f0f0;border-bottom: 1px solid #d9d9d9;}
		.theSecondTitle span{display:block;padding:0 10px;float:left}
		.theSecondTitle .drop img{display:block;height:20px;}
		.theThirdStage{padding-left:20px; margin-bottom:5px;border-top: 1px solid #d9d9d9;}
		.theThirdStage dt{display:block;}
		.theThirdStage dl dd{display:block;float:left;padding:0 20px; height:30px; line-height:30px;}
		.btnGroup{padding:40px 0;}
		.hide_Validform{
			display: none !important;
		}
	</style>
	
</head>
<body>
	<div class="page-container clearfix">
		<form action="${ctx}/experimentCourseClassController/distributeClassToExperimentCourse/${experimentCourse.experimentCourseId}" class="form" id="form-classManage-edit">
			<div class="head">
				<p class="p1">对《<span class="span1">${experimentCourse.courseName }</span>》进行开课管理<span class="span2">【任课教师:<c:forEach items="${experimentCourse.teacherInfoList}" var="teacherInfo" >${teacherInfo.name } &nbsp;</c:forEach>】</span></p>
			</div>
			<ul class="coursesArraign">
				<c:forEach items="${departmentList }" var="department">
					<li class="theFirstStage clearfix">
						<dl>
							<dt class="theFirstTitle"><span>${department.name }</span><span class="drop"><img src="${ctx }/staticfile/images/drop1.png"></span></dt>
							<c:forEach items="${department.majorList }" var="major">
								<dd class="theSecondStage">
									<dl>
										<dt class="theSecondTitle clearfix"><span class="drop"><img src="${ctx}/staticfile/images/up.png"></span><span>${major.name }</span></dt>
										<c:forEach  items="${major.gradeList }" var="grade">
											<dd class="theThirdStage">
												<dl class="clearfix">
													<dt><label><input type="checkbox" onchange="allClassChecked(this);">${grade.name }</label></dt>
													<c:forEach items="${grade.tbClassList }" var="tbClass" >
														<dd><label><input type="checkbox" name="tbClassIds"  value="${tbClass.id }"<c:if test="${tbClass.isSelect==1 }">checked="checked"</c:if>>${tbClass.name }</label></dd>
													</c:forEach>
												</dl>
											</dd>
										</c:forEach>
									</dl>
								</dd>
							</c:forEach>
						</dl>
					</li>
				</c:forEach>
			</ul>
			<input name="oldClassIds" class="oldClassIds" type="hidden" value=""/>
			<div class="text-c btnGroup">
				<button onClick="" class="btn btn-primary radius" type="" id="classManage-edit-sub">
				<i class="Hui-iconfont">&#xe600;</i>
				 开课</button>
				<button onClick="" class="btn btn-secondary radius" type="button" id="classManage-edit-reset">
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
$(function(){
	var menuParam="${menuParam}"
	
	 // 获取已经选中的id
	 obj = document.getElementsByName("tbClassIds");
	 check_val = [];
	 for(k in obj){
	     if(obj[k].checked)
	         check_val.push(obj[k].value);
	 }
	 $(".oldClassIds").val(check_val);
	 
	
	 
	 $("input[name=tbClassIds]").off().on('change',function(){
		 var obj = $(this);
		 var end = obj.parent().parent().parent().find('input[name=tbClassIds]').length;
		 var a = true;
		 obj.parent().parent().parent().find('input[name=tbClassIds]').each(function(index,ele){
			 if(obj.parent().parent().parent().find('input[name=tbClassIds]').eq(index).prop('checked')==false){
				 a = false;
			 }
		 });
		 obj.parent().parent().siblings('dt').find('input[type=checkbox]').attr('checked',a);
	 })
	 
	 
	 $(".theFirstTitle").toggle(function(){
		 $(this).siblings('.theSecondStage').slideDown();
		 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/up1.png">');
	 },function(){
		 $(this).siblings('.theSecondStage').slideUp();
		 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/drop1.png">');
	 })
	 
	 $(".theSecondTitle").toggle(function(){
		 $(this).siblings('.theThirdStage').slideUp();
		 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/drop.png">');
	 },function(){
		 $(this).siblings('.theThirdStage').slideDown();
		 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/up.png">');
	 })
 
 
	$("#classManage-edit-reset").click(function(){
	 var index = parent.layer.getFrameIndex(window.name);
	 parent.layer.close(index);
	})


	$(".selectStuNum").hide();
	
	$("#form-classManage-edit").Validform({
		btnSubmit:"#classManage-edit-sub", 
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
				layer.msg(data.msg,{icon:2,time:1500});
				setTimeout('window.parent.location.reload()',1800);
			}
		}
	});
})
 
 
  function allClassChecked(obj){
		 var $obj = $(obj);
		 if($obj.prop('checked')){
			 $obj.parent().parent().siblings('dd').find('input[name=tbClassIds]').attr('checked',true);
		 }else{
			 $obj.parent().parent().siblings('dd').find('input[name=tbClassIds]').attr('checked',false);
		 }
	 }
 

$(function(){
	$("#Validform_msg").addClass("hide_Validform");
})
</script>
</html>