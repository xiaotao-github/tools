<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- <!DOCTYPE html> -->
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
<style type="text/css">
	.hide_Validform{
		display: none !important;
	}
</style>
</head>
<body>
<div style="-webkit-overflow-scrolling:touch;overflow:auto; height:100vh;" id="wrapper">
<div class="page-container clearfix">
	<form action="${ctx}/courseScheduleController/update" method="post" class="form form-horizontal" id="form-classManage-edit">
	
	<input type="hidden" name="scheduleId" value="${courseSchedule.scheduleId }"/>
		<c:if test="${courseSchedule.type ==3 }">
			<div class="row cl">
				<label class="col-xs-3 col-sm-2 pn-0 text-r"><span class="c-red pr-5">*</span>可预约工位：</label>
				<div class="formControls col-xs-9 col-sm-9 pr-30">
					<input type="text" class="input-text" value="${courseSchedule.seats }" placeholder="请填写可预约工位,可预约工位只能是整数且大于已预约人数!" name="seats" id="seats" datatype="number" nullmsg="请输入可预约工位！" errormsg="可预约工位" ajaxurl="">
				</div>
				<div class="col-xs-9 col-sm-9 ml-120">
					<span class="Validform_checktip"></span>
				</div>
			</div> 
		</c:if>
		<div class="row cl">
			<label class="col-xs-3 col-sm-2 pn-0 text-r">预约说明：</label>
			<div class="formControls col-xs-9 col-sm-9 pr-30">
				<textarea name="presentation" cols="" rows="" class="textarea"  placeholder="请输入预约说明.." datatype="*0-500" dragonfly="true"  onKeyUp="$.Huitextarealength(this,500)" ignore="ignore">${courseSchedule.presentation }</textarea>
				<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
			</div>
			<div class="col-xs-9 col-sm-9 ml-120">
				<span class="Validform_checktip"></span>
			</div>
		</div>
		<div class="row cl">
			<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">
				<button onClick="" class="btn btn-primary radius" type="button" id="classManage-edit-sub">
				<!-- <i class="Hui-iconfont">&#xe632;</i>  -->
				<i class="iconfont icon-queren1"></i>
				保存</button>
				<button onClick="" class="btn btn-secondary radius" type="button" id="classManage-edit-reset">
				<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
				<i class="iconfont icon-zhongzhi2"></i>
				重置</button>
			</div>
		</div>
	</form>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>

<script type="text/javascript">
	$(function(){
		
		//alert(1);
		$("#form-classManage-edit").Validform({
			btnSubmit:"#classManage-edit-sub", 
			btnReset:"#classManage-edit-reset",
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
				"number":/^[1-9]\d*$/,
				"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
				"n-en" :  /^[A-Za-z0-9]+$/,
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
				//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
				//这里明确return false的话将不会继续执行验证操作;	
				var value = $("textarea[name='presentation']").val();
				value = value.replace(/\r\n/g, '<br/>').replace(/\n/g,'<br/>').replace(/\s/g,'&nbsp;'); 
				$("textarea[name='presentation']").val(value);
				
				if('${courseSchedule.type}' == '3'){
					var seats = $("#seats").val();
					var appointStudentSize = '${courseSchedule.appoinNum}'/1;
					if(seats<appointStudentSize){
						layer.msg('可预约工位不能少于已预约工位');
						return false;
					}
				}
			},
			beforeSubmit:function(curform){
				//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
				//这里明确return false的话表单将不会提交;	
			},
			callback:function(data){
				if(data.status=="200"){
					layer.msg('修改成功',{icon:1,time:1500});
					var index = parent.layer.getChildFrame(window.name);
					setTimeout(function(){window.parent.location.reload()},1000);
				}else{
					layer.msg(data.msg,{icon:2,time:1500});
					/* window.location.reload(); */
				}
			}
		});
	})
	
$().ready(function(){
	$("#Validform_msg").addClass("hide_Validform");
})
</script>
</div>
</body>
</html>