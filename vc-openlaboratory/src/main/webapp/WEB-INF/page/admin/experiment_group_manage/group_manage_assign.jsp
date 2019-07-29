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
	<form action="${ctx}/experimentGroupController/coloneExeprimentGroupToNewExperiment" method="post" class="form form-horizontal" id="form-groupManage-add">
		<input name="teacherInfoId" value="${teacherInfo.id }" type="hidden" />
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>选择院系：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<select name="departmentId" id="departmentSelect" datatype="* select" class="departmentSelect select select-box" nullmsg="请选择所在院系！" errormsg="请选择所在院系！">
						<option value='' disabled selected style='display:none;'>请选择所在院系!</option>
					</select> 
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>选择课程：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<select name="experimentCourseId" id="experimentCourseSelect" datatype="* select" class="experimentCourseSelect select select-box" nullmsg="请选择实验课程！" errormsg="请选择实验课程！">
						<option value='' disabled selected >请选择实验课程!</option>
					</select> 
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>选择实验：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<select name="experimentId" id="experimentSelect" datatype="* select" class="experimentSelect select select-box" nullmsg="请选择实验！" errormsg="请选择实验！">
					<option value='' disabled selected >请选择实验!</option>
				</select> 
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>选择班级：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<select name="tbClassId" id="tbClassSelect" datatype="* select" class="tbClassSelect select select-box" nullmsg="请选择班级！" errormsg="请选择班级！">
						<option value='-1' disabled selected >请选择班级!</option>
					</select> 
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验开始时间：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
				    <input class='notice-time input-text Wdate'  type='text' id='startTime' name="startTime"  onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'noticeEndTime\')}'})">  
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验结束时间：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="notice-time input-text Wdate" id='noticeEndTime' name="endTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'startTime\')}'})"/>   
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>选择历史实验模板：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<select name="cloneExperimentId" id="historyExperimentSelect" datatype="* select" class="experimentSelect select select-box" nullmsg="请选择实验模板！" errormsg="请选择实验模板！">
					<option value='' disabled selected >请选择历史实验模板!</option>
				</select> 
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3"></label>
			<div class="col-xs-8 col-sm-8 stuMember">
			</div>
		</div>
		<div class="row cl">
			<div class="col-xs-12 col-sm-12 text-c cl">
				<button onClick="" class="btn btn-primary radius" type="" id="groupManage-add-sub">
				<i class="Hui-iconfont">&#xe600;</i> 
				添加</button>
				<button onClick="" class="btn btn-secondary radius" type="" id="groupManage-add-reset">
				<!-- <i class="Hui-iconfont">&#xe68f;</i> -->
				<i class="iconfont icon-zhongzhi2"></i> 
				重置</button>
			</div>
		</div>
	</form>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<!--框架校验-->
<script type="text/javascript">
	var isGroupTemp = true;
	$("#form-groupManage-add").Validform({
		btnSubmit:"#groupManage-add-sub", 
		btnReset:"#groupManage-add-reset",
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
			
			if(isGroupTemp){
				return isGroupTemp;
			}else{
				layer.msg('操作失败',{icon:1,time:1500});
				return isGroupTemp
			}
		},
		callback:function(data){
			if(data.status=="200"){
				layer.msg('操作成功',{icon:1,time:1500});
				var index = parent.layer.getChildFrame(window.name);
				//parent.layer.close(index);
				setTimeout(function(){window.parent.location.reload()},1000);
			}else{
				$("#Validform_msg").css('display','none');
				layer.msg(data.msg,{icon:2,time:1500});
				/* window.location.reload(); */
			}
		}
	});
	
	
	</script>
	<!--异步获取数据-->
	<script type="text/javascript">

	function departmentSelChange(){
		var departmentSelectedId = $("#departmentSelect").val();//departmentSelctedId 为下拉框选择相对应院系后获取到的该院系的ID 
		experimentCourseSelectedListAjax_init(departmentSelectedId);
	}
	/*查询实验课程*/
	function experimentCourseSelectedListAjax_init(departmentSelectedId){
		$.ajax({
			async: true,
			type: 'GET',
			url: '${ctx}/experimentCourseController/selectExperimentCourseByDepartmentId/'+departmentSelectedId,
			dataType: 'json',
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					$(".experimentCourseSelect ").html("");
					$(".experimentCourseSelect ").html("<option disabled selected>"+sysresult.msg+"</option>");
				}else{
					/* var departmentName = new Array();
					var departmentId = new Array(); */
					var optioncontent = '<option disabled selected>请选择实验课程!</option>';
					$(".experimentCourseSelect").html(optioncontent);
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent = '<option name="experimentCourseId" value="'+(sysresult.data[i]).experimentCourseId+'">'+(sysresult.data[i]).courseName+'</option>';
						$(".experimentCourseSelect").append(optioncontent);
					}
				}
			},
			error:function(data) {
	
			}
		});
	}
	function experimentCourseSelChange(){
		var experimentCourseId = $("#experimentCourseSelect").val();//experimentCourseSelect 为下拉框选择相对应院系后获取到的该院系的ID 
		experimentSelectedListAjax_init(experimentCourseId);
		tbClassListAjax_init(experimentCourseId);
	}
	/*根据实验课程ID查询实验*/
	function experimentSelectedListAjax_init(experimentCourseId){
		$.ajax({
			async: true,
			type: 'GET',
			url: '${ctx}/experimentController/selectExperimentByExperimentCourseId/'+experimentCourseId+'/1',
			dataType: 'json',
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					$(".experimentSelect ").html("");
					$(".experimentSelect ").html("<option disabled selected>"+sysresult.msg+"</option>");
				}else{
					/* var departmentName = new Array();
					var departmentId = new Array(); */
					var optioncontent = '<option disabled selected>请选择实验!</option>';
					$(".experimentSelect").html(optioncontent);
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent = '<option name="experimentId" value="'+(sysresult.data[i]).experimentId+'">'+(sysresult.data[i]).experimentName+'</option>';
						$(".experimentSelect").append(optioncontent);
					}
				}
			},
			error:function(data) {
			}
		});
	}
	/*根据实验课程ID查询课程下的班级*/
	function tbClassListAjax_init(experimentCourseId){
		$.ajax({
			async: true,
			type: 'GET',
			url: '${ctx}/experimentCourseClassController/selectClassByExperimentCourseId/'+experimentCourseId,
			dataType: 'json',
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					$(".tbClassSelect ").html("");
					$(".tbClassSelect ").html("<option disabled selected>"+sysresult.msg+"</option>");
				}else{
					/* var departmentName = new Array();
					var departmentId = new Array(); */
					var optioncontent = '<option disabled selected value="-1">请选择实验班级!</option>';
					$(".tbClassSelect").html(optioncontent);
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent = '<option name="tbClassId" value="'+(sysresult.data[i]).id+'">'+(sysresult.data[i]).name+'('+sysresult.data[i].majorName+')</option>';
						$(".tbClassSelect").append(optioncontent);
					}
				}
			},
			error:function(data) {
				$(".tbClassSelect ").html("");
			}
		});
	}
	function classSelChange(){
		var experimentCourseId = $("#experimentCourseSelect").val();//experimentCourseSelect 为下拉框选择相对应院系后获取到的该院系的ID
		var experimentId=$("#experimentSelect").val();
		var classId=$("#tbClassSelect").val();
		//查询该班级下是否已经有实验小组
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'${ctx}/experimentGroupController/isGroup/'+experimentCourseId+'/'+experimentId+'/'+classId,
			sync:true,
			success: function(sysresult){
				if(sysresult.status==200){
					isGroupTemp = true;
				}else{
					layer.msg("该班级在本实验中已经有实验小组了,无法实验实验模板分配小组.",1800);
					isGroupTemp = false;
					//查询班级中的其他历史实验
					selectHistoryExperiment(experimentId,classId);
				}
			},
			error: function(){
			}
		});
	}
	/* 根据班级ID查询该班级下的其他历史实验*/
	
	function selectHistoryExperiment(experimentId,classId){
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'${ctx}/courseExperimentController/selectClassOtherExperiment/'+experimentId+'/'+classId,
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					$("#historyExperimentSelect ").html("");
					$("#historyExperimentSelect").html("<option disabled selected>"+sysresult.msg+"</option>");
				}else{
					/* var departmentName = new Array();
					var departmentId = new Array(); */
					var optioncontent = '<option disabled selected>请选择实验模板!</option>';
					$("#historyExperimentSelect").html(optioncontent);
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent = '<option value="'+(sysresult.data[i]).experimentId+'">'+(sysresult.data[i]).experimentName+'</option>';
						$("#historyExperimentSelect").append(optioncontent);
					}
				}
			},
			error: function(){
				
			}
		})
	}
	
	 $('#historyExperimentSelect').change(function(){
		var experimentId = $(this).val();
		var classId=$("#tbClassSelect").val();
		$.ajax({
			type:'GET',
			url: '${ctx}/experimentGroupController/selectClassExperimentGroup/'+experimentId+'/'+classId,
			dataType: 'json',
			success: function(sysresult){
				var data = sysresult.data;
				var groupName = '';
				var groupMember = '';
				var content = '';
				for(var i=0;i<data.length;i++){
					groupName = '<dt style="font-weight:bold;margin-bottom:10px;">小组'+(i*1+1)+': '+data[i].groupName+'</dt>';
					var groupList = data[i].studentInfoList;
					for(var j=0;j<groupList.length;j++){
						groupMember += '<dd class="f-l pl-5 pr-5">'+groupList[j].name+'</dd>';
					}
					content += '<dl class="clearfix pd-10" style="border:1px solid #ddd;background: #f2f2f2;">'+groupName+groupMember+'</dl>';
				}
				$('.stuMember').html(content);
			},
			error: function(sysresult){
				
			}
		})
	});
	
	function checkAll(obj){
		if($(obj).prop('checked')){
			$('.studentIfnoCheckbox ul').find('input[type="checkbox"][name="studentInfoIds"]').each(function(){
				$(this).prop('checked',true);				
			})
		}else{
			$('.studentIfnoCheckbox ul').find('input[type="checkbox"][name="studentInfoIds"]').each(function(){
				$(this).prop('checked',false);				
			})
		}
	}
	
	$(function(){
		/*获取院系*/
		var menuParam = '${param.menuParam}${menuParam}';
	
		if("${menuParam}"=="3" || "${param.menuParam}"=="3"){
				menuParam=2;
			}
		var url = '';
		if(menuParam==2){
			url ='${MANAGE_URL}/departmentController/selectAllDepartmentReturnSysResult/2?callback=?';
		}else{
			url ='${MANAGE_URL}/departmentController/selectAllDepartmentReturnSysResult/-1?callback=?'; 
		}
		
	$.getJSON(url,function(sysresult){
		if(sysresult.status == 202||sysresult.status == 400){
			$("#departmentSelect option").html("无法查到您的院系信息");
		}else{
			var optioncontent = '';
			optioncontent = '<option name="name" value="" selected>请选择所属院系</option>';
				$("#departmentSelect").append(optioncontent);
			for(var i=0;i<sysresult.data.length;i++){
				optioncontent = '<option name="" value="'+sysresult.data[i].id+'">'+sysresult.data[i].name+'</option>';
				$("#departmentSelect").append(optioncontent);
			}
		}
	});
	
	$("#departmentSelect").change(function(){
		departmentSelChange();
	});
	$("#experimentCourseSelect").change(function(){
		experimentCourseSelChange();
	});
	/*班级下-该实验中未分配小组的学生*/
	$("#tbClassSelect").change(function(){
		classSelChange();
	});
	$("#experimentSelect").change(function(){
		$("#tbClassSelect").val("-1");
	});
	
	$("#Validform_msg").addClass("hide_Validform");
})
</script>
</body>
</html>