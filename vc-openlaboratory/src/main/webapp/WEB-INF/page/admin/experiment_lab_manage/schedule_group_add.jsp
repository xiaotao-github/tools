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
	<form action="${ctx}/courseScheduleController/addGroup" method="post" class="form form-horizontal" id="form-groupManage-add">
		<input name="studentInfoIds" type="hidden">
		<input name="scheduleId" type="hidden" value="${scheduleId }">
		<input name="classId" type="hidden" value="${classId }">
		<input name="experimentId" type="hidden" value="${experimentId }">
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>小组名称：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" value="" placeholder="请填写年级名称,只能由汉字组成!" id="param" name="groupName" datatype="*" nullmsg="请输入小组名称！" errormsg="小组名称不可用！请重新输入">
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>未分配小组成员：</label>
             <div class="right-div col-xs-8 col-sm-8">
                 <div class="studentIfnoCheckbox">
                 
              		   <c:choose>
              		        <c:when test="${empty studentList || empty studentList.data }"><span>该班级下暂无学生或者全部学生已经组成小组</span></c:when>
              		        <c:otherwise>
              		          <p><label><input type="checkBox" onchange="checkAll(this);"/><span>全选</span></label></p>
	              		           <c:forEach items="${studentList.data}" var="s">
					              		<ul>  
					              		  <li class="f-l pr-10"><label><input type="checkbox" name="studentInfoId" value="${s.id }" ><span>${s.name }</span><label></li>
					              		</ul>
			              		    </c:forEach>
	              		        </c:otherwise>
              		   </c:choose>
                 </div>
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
			var data = new Array();
			$("input[name='studentInfoId']:checked").each(function(){
				data.push($(this).val());
			})
		  $("input[name='studentInfoIds']").val(data+"");
		
			var ids=$("input[name='studentInfoIds']").val();
			if(ids==null || ids==''){
				layer.msg('请选择小组成员！',{icon:2,time:1500});
              return false;
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
	/*根据课程表ID，班级ID，查询该班级下未分配小组的学生信息*/
	StudentListAjax_init($("#tbClassSelect").val());
	
	function StudentListAjax_init(classId){
		if(classId == null || classId == "")
			return false;
		$.ajax({
			async: true,
			type: 'GET',
			url: "${ctx}/courseScheduleController/getNoGroupStudent/${scheduleId}/"+classId,
			dataType: 'json',
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					$(".studentIfnoCheckbox ul").html("");
					$(".studentIfnoCheckbox ul").html('<li>'+sysresult.msg+'</li>');
				}else{
					var optioncontent=''; 
					//$(".studentIfnoCheckbox ul").html(optioncontent);
					for(var i=0;i<sysresult.data.length;i++){
						var tempValue = "";
						if(sysresult.data[i].username != null){
							if(sysresult.data[i].username.length>=4){
								var username = sysresult.data[i].username;
								tempValue = sysresult.data[i].name+"("+username.substring(username.length-4,username.length)+")";
							}else{
								tempValue = sysresult.data[i].name+"("+username+")";
							}
						}else{
							tempValue = sysresult.data[i].name;
						}
						
						optioncontent += '<li class="f-l pr-10"><label><input type="checkbox" name="studentInfoId" value="'+sysresult.data[i].id+'" ><span>'+tempValue+'</span><label></li>';
					}
					if(optioncontent == ""){
						optioncontent += "该班级下暂无学生或者全部学生已经组成小组";
					}
					$(".studentIfnoCheckbox ul").html(optioncontent);
				} 
			},
			error:function(data) {
			}
		})
	}
	
	function checkAll(obj){
		if($(obj).prop('checked')){
			$('.studentIfnoCheckbox ul').find('input[type="checkbox"][name="studentInfoId"]').each(function(){
				$(this).prop('checked',true);				
			})
		}else{
			$('.studentIfnoCheckbox ul').find('input[type="checkbox"][name="studentInfoId"]').each(function(){
				$(this).prop('checked',false);				
			})
		}
	}
	
	$("#tbClassSelect").bind("change",function(){
		 StudentListAjax_init($(this).val());
	});
	
	
	$(function(){
		$("#Validform_msg").addClass("hide_Validform");
	});
</script>

</body>
</html>