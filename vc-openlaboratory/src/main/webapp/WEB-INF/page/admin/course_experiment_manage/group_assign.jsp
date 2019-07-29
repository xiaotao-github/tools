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
</head>
<body>
<div class="page-container clearfix">
	<form action="${ctx}/experimentGroupController/coloneExeprimentGroupToNewExperiment" method="post" class="form form-horizontal" id="form-groupManage-add">
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属院系：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<input name="teacherInfoId" value="${teacherInfo.id }" type="hidden" />
					${department.name}
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属课程：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<input name="experimentCourseId" value="${experimentCourse.experimentCourseId }" type="hidden" />
					${experimentCourse.courseName }
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属实验：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<input name="experimentId" value="${experiment.experimentId }" type="hidden" />
					${experiment.experimentName }
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>选择班级：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
				<input name="tbClassId" value="${tbClass.id }" type="hidden" />
					${tbClass.name }
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
				<select name="cloneExperimentId" id="experimentSelect" datatype="* select" class="experimentSelect select select-box" nullmsg="请选择实验！" errormsg="请选择实验！">
					<option value='' disabled selected >请选择历史实验模板!</option>
					<c:forEach items="${experimentList }" var="ex">
						<option value='${ex.experimentId }' >${ex.experimentName }</option>
					</c:forEach>
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
		},
		callback:function(data){
			if(data.status=="200"){
				layer.msg(data.msg,{icon:1,time:1500});
				$("#Validform_msg").css('display','none');
				var index = parent.layer.getChildFrame(window.name);
				//parent.layer.close(index);
				window.parent.location.reload();
			}else{
				$("#Validform_msg").css('display','none');
				layer.msg(data.msg,{icon:2,time:1500});
				/* window.location.reload(); */
			}
		}
	});
	
	
	$('#experimentSelect').change(function(){
		var experimentId = $(this).val();
		$.ajax({
			type:'GET',
			url: '${ctx}/experimentGroupController/selectClassExperimentGroup/'+experimentId+'/${tbClass.id}',
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
	})
	</script>

</body>
</html>