<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验管理</title>
</head>
<body>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验管理 <span class="c-gray en">&gt;</span> 
		<c:if test="${menuParam==1}">
		所有实验
		</c:if>
		<c:if test="${menuParam==2}">
		院系实验
		</c:if>
		<c:if test="${menuParam==3}">
		我的实验
		</c:if><span class="c-gray en">&gt;</span> 
		${courseName }
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</nav>
	
	
	<div class="page-container clearfix">
		<div class=" pd-5 bg-1 bk-gray c-orange f-20" style="letter-spacing:2px;">
			所属课程: <span><strong>${param.courseName }</strong></span>
		</div>
		<div class="editbarcl mt-10 mb-20">
			<c:choose>
				<c:when test="${menuParam eq 1 }">
							<c:choose>
								<c:when test="${menuParam eq 1 }">
									<a onclick="experiment_add('添加实验','${ctx}/experimentController/toAddExperimentPage/${menuParam}/${experimentCourseId }/${courseName }')" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a> 
									<a onclick="Hui_admin_tab(this);" href="javascript: void(0);" data-title="查看所有实验" data-href="${ctx }/experimentController/selectExperimentList/${menuParam}" class="btn radius btn-primary"><i class="Hui-iconfont Hui-iconfont-yulan pr-5"></i>查看所有实验列表</a>
								</c:when>
								<c:otherwise>
								</c:otherwise>
							</c:choose> 
				</c:when>
				<c:when test="${menuParam eq 2 }">
						<a onclick="experiment_add('添加实验','${ctx}/experimentController/toAddExperimentPage/${menuParam}/${experimentCourseId }/${courseName }')" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a> 
						<a onclick="Hui_admin_tab(this);" href="javascript: void(0);" data-title="查看所有实验" data-href="${ctx }/experimentController/selectExperimentList/${menuParam}" class="btn radius btn-primary"><i class="Hui-iconfont Hui-iconfont-yulan pr-5"></i>查看所有实验列表</a>
					
				</c:when>
				<c:otherwise>
						<a onclick="experiment_add('添加实验','${ctx}/experimentController/toAddExperimentPage/${menuParam}/${experimentCourseId }/${courseName }')" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a> 
						<a onclick="Hui_admin_tab(this);" href="javascript: void(0);" data-title="查看所有实验" data-href="${ctx }/experimentController/selectExperimentList/${menuParam}" class="btn radius btn-primary"><i class="Hui-iconfont Hui-iconfont-yulan pr-5"></i>查看所有实验列表</a>
				</c:otherwise>
			</c:choose>
		</div>
		<div class="pt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="30">实验名称</th>
						<!-- <th width="30">实验类型</th> -->
						<th width="30">难易程度</th>
						<th width="20">实验课时</th>
						<!-- <th width="60">标识</th> -->
						<th width="30">作者</th>
						<th width="60">实验创建时间</th>
						<th width="60">最近修改时间</th>
						<th width="30">实验资源</th>
						<th width="30">实验模板</th>
						<th width="30">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
				<%-- <c:if test="${empty  experimentCourse.experimentList  }"> <div class="Hui-tags-has"><p style="text-align:center;color:red; font-size:30px "  >当前课程下没有实验，请先添加实验！</p> </div></c:if> --%>
					<c:forEach items="${experimentCourse.experimentList }" var="experiment">
						<tr class="text-c"  width="30">
							<td class="text-c">${experiment.experimentName }</td>
						
							<td class="text-c" width="30">
							 <c:choose>
								<c:when test="${experiment.level==1 }">
									容易
								</c:when>
								<c:when test="${experiment.level==2 }">
									适中
								</c:when>
								<c:when test="${experiment.level==3 }">
									困难
								</c:when>
							</c:choose> 
							</td>
							<td class="text-c" width="20">${experiment.needHour }</td>							
							<%-- <td class="text-c">${experiment.keyword}</td> --%>
							<td class="text-c" width="30">${experiment.author.name}</td>
							<td class="text-c" width="60"><fmt:formatDate value="${experiment.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
							<td class="text-c" width="60"><fmt:formatDate value="${experiment.updateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
							 <td class="text-c"  width="30">
								<a  class="btn-warning radius pd-5" style="display:inline-block;" onclick="file_add('分配资源','${ctx}/experimentFileController/selectFileToDistribute/${experiment.experimentId }/${cookie.vcoocUserId.value }')"><i class="experimentFont" title="分配实验资源">&#xe612;</i>分配实验资源</a>
								<%--  <a	style="text-decoration: none;" onclick="experiment_add_muban('编辑实验报告模板','${ctx }/experimentController/selectExperimentToMubanPage/${experiment.experimentId }')"><i class="experimentFont"  title="编辑实验报告模板">&#xe626;</i></a> --%>
							</td>
							<td>
								<!-- 不需要硬件的项目把下面的模板连接注释掉3 -->
								<c:choose>
								<c:when test="${not empty experiment.extId}">
									<a style="text-decoration: none;display:inline-block;" onclick="experiment_delOrAddTemplate(this,${experiment.experimentId})" href="javascript:;" class="btn-danger radius pl-5 pr-5"  title="清空模板">停用</a>
									<a style="text-decoration: none;display:inline-block;" class="btn-primary pr-5 pl-5 radius" onclick="experiment_template('编辑实验模板','${ctx }/templateController/JumpUpdateTemplatePage/${experiment.experimentId }/${experiment.experimentName }')" title="修改模板">编辑实验模板</a>
								</c:when>
								<c:otherwise>
									<a style="text-decoration: none;" onclick="experiment_delOrAddTemplate(this,${experiment.experimentId})" href="javascript:;" class="btn-success radius pl-5 pr-5"  title="创建模板">创建</a>
									<a style="text-decoration: none;display:inline-block;display:none;" class="btn-primary pr-5 pl-5 radius" onclick="experiment_template('编辑实验模板','${ctx }/templateController/JumpUpdateTemplatePage/${experiment.experimentId }/${experiment.experimentName }')" title="修改模板">编辑实验模板</a>
								</c:otherwise>
								</c:choose>
								<%-- <a style="text-decoration: none;" onclick="experiment_template('添加实验模板','${ctx }/templateController/JumpAddTemplatePage/${experiment.experimentId }/${experiment.experimentName }')" title="添加模板"><i class="iconfont icon-bianji"></i></a> --%>
								<%-- <a style="text-decoration: none;" onclick="experiment_delTemplate(this,${experiment.experimentId})" href="javascript:;"  title="清空模板"><i class="iconfont icon-bianji"></i></a> --%>
							</td>
							<td class="text-c product-brand-manage">
								<a style="text-decoration: none;" onclick="experiment_edit('修改实验','${ctx }/experimentController/selectExperimentToEditPage/${experiment.experimentId }/${menuParam }')" title="修改"><i class="iconfont icon-bianji"></i></a>
								<a	style="text-decoration: none;" data-href="${ctx }/experimentController/selectExperimentToPreviewPage/${experiment.experimentId }" data-title="${experiment.experimentName }" title="实验预览" onclick="Hui_admin_tab(this);"><i class="experimentFont">&#xe64e;</i></a>
								<a style="text-decoration: none" class="ml-5" onClick="experiment_del(this,${experiment.experimentId})" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
	<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--/_footer 作为公共模版分离出去-->

	<!--请在下方写此页面业务相关的脚本-->

	<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/laypage/1.2/laypage.js"></script>
	<script type="text/javascript">
			
	//实验添加
	function experiment_add(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//实验修改
	function experiment_edit(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		// layer.full(index);
	}
	
	//实验模板
	function experiment_template(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['900px','650px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		// layer.full(index);
	}
	
	
	
	//实验预览
	function experiment_preview(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//分配资源
	function file_add(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//添加实验报告模板
	function experiment_add_muban(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//实验删除	url: '${ctx}/experimentController/updateExperimentStealth/'+id+'/'+stealth,
	function experiment_del(obj,id){
		layer.confirm('确认要删除吗？',function(index){
			$.ajax({
			 	type: 'POST',
			 	url: '${ctx}/experimentController/updateExperimentStealth/'+id,
			 	dataType: 'json',
			 	success: function(data){
			 		if(data.status=="200"){
			 			$(obj).parents("tr").remove();
				 		layer.msg('已删除!',{icon:1,time:1000});
			 		}else{
			 			layer.msg(data.msg,{icon:1,time:1000});
			 	}},
			 	error:function(data) {
			 		console.log(data.msg);
			 	},
			 });
		});
	}
	//模板删除
	function experiment_delOrAddTemplate(obj,id){
		var url = '',
			tips = '',
			successTips = '',
			subData = '';
		if($(obj).hasClass('btn-danger')){
			tips = '确定不启用实验模板?';
			url = '${ctx}/templateController/deleteTemplateExId/'+id;
		}else{
			tips = '确定启用实验模板?';
			successTips = '已启用实验模板';
			url = '${ctx }/templateController/addTemplate/'+id;
		}
		layer.confirm(tips,function(index){
			$.ajax({
			 	type: 'POST',
			 	url: url,
			 	dataType: 'json',
			 	success: function(data){
			 		if(data.status=="200"){
						if($(obj).hasClass('btn-danger')){
							$(obj).removeClass('btn-danger').addClass('btn-success').html('创建').attr('title','创建模板');
							$(obj).siblings('a').hide();
							successTips = '已停用实验模板';
						}else{
							$(obj).removeClass('btn-success').addClass('btn-danger').html('停用').attr('title','删除模板');
							$(obj).siblings('a').show();
							successTips = '已启用实验模板';
						}
			 			layer.msg(successTips,{icon:1,time:1000});
			 		}else{
			 			layer.msg(data.msg,{icon:1,time:1000});
			 	}},
			 	error:function(data) {
			 		console.log(data.msg);
			 	},
			 });
		});
	}
	
	$(function(){
		$('.table-sort').dataTable({
			"aaSorting": [[0, "desc" ]],//默认第几个排序
			"bStateSave": false,//状态保存
			"aoColumnDefs": [
			  {"orderable":false,"aTargets":[6,8]}// 制定列不参与排序
			]
		});
	});
</script>
</body>
</html>